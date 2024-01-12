import prisma from '../../../../lib/prisma';

export default async function handler(req:any, res:any) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await prisma.animal.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json({ message: 'Animal deleted successfully' });
    } catch (error) {
      console.error('Error deleting animal:', error);
      res.status(500).json({ message: 'An error occurred while deleting the animal' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
