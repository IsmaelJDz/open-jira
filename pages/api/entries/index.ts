import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);

    case 'POST':
      return postEntry(req, res);

    default:
      return res.status(400).json({
        message: 'Endpoint not found',
      });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connectDb();

  const entries = await Entry.find().sort({ createdAt: 'ascending' });

  await db.disconnectDb();

  res.status(200).json(entries);
};

const postEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connectDb();

  const { description } = req.body;

  const newEntry = await new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await newEntry.save();

    await db.disconnectDb();

    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnectDb();

    res.status(500).json({
      message: 'Error saving entry',
    });
  }
};
