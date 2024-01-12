import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function getAllMessages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const messages = await prisma.message.findMany({
        include: { user: true },
      });
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res
        .status(500)
        .json({ message: 'An error occurred while fetching messages' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
