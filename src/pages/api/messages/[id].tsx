import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function deleteMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      const deletedMessage = await prisma.message.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json(deletedMessage);
    } catch (error) {
      console.error('Error deleting message:', error);
      res
        .status(500)
        .json({ message: 'An error occurred while deleting the message' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
