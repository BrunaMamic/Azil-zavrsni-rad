// pages/api/news/delete.ts

import prisma from '../../../../lib/prisma';

export default async function deleteHandler(req: any, res: any) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await prisma.announcement.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
      console.error('Error deleting news:', error);
      res.status(500).json({ message: 'An error occurred while deleting the news' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
