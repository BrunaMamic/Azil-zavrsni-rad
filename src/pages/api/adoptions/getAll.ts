import prisma from '../../../../lib/prisma';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const adoptionRequests = await prisma.adoptionRequest.findMany({
        include: {
          animal: true,
          user: true,
        },
      });

      res.status(200).json(adoptionRequests);
    } catch (error) {
      console.error('Error fetching adoption requests:', error);
      res.status(500).json({ message: 'An error occurred while fetching adoption requests' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
