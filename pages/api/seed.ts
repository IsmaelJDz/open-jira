// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedData } from '../../database';
import { Entry } from '../../models';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production') {
    res.status(200).json({
      message:
        "You don't have access to this API in development mode",
    });
  }

  await db.connectDb();

  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);

  await db.disconnectDb();

  res.status(200).json({
    message: 'Successfully connected to the database',
  });
}
