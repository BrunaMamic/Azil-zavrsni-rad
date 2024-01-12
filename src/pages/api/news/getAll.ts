import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function getAllNewsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const news = await prisma.announcement.findMany();
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'An error occurred while fetching news' });
  }
}
