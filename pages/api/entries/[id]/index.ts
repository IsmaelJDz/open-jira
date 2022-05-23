import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';
type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: `Invalid ID ${id}`,
    });
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);

    case 'GET':
      return getEntry(req, res);

    default:
      return res.status(400).json({
        message: 'Endpoint not found',
      });
  }
}

const getEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connectDb();
  const entry = await Entry.findById(id);
  await db.disconnectDb();

  if (!entry) {
    return res.status(404).json({
      message: `Entry with ID ${id} not found`,
    });
  }

  res.status(200).json(entry);
};

const updateEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connectDb();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnectDb();
    return res.status(404).json({
      message: `Entry with ID ${id} not found`,
    });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );

    res.status(200).json(updatedEntry!);
  } catch (error) {
    await db.disconnectDb();

    return res.status(500).json({
      message: 'Error updating entry',
    });
  }
};
