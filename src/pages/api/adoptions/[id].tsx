// pages/api/adoptions/requests/[id].ts

import prisma from '../../../../lib/prisma';

export default async function handler(req: any, res: any) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const updatedAdoptionRequest = await prisma.adoptionRequest.update({
        where: { id: Number(id) },
        data: {
          approved: true, // Set the `approved` status to true when the button is clicked
        },
      });

      if(updatedAdoptionRequest){

        const updateAnimalStatus = await prisma.animal.update({
          where: {
            id: updatedAdoptionRequest.animalId
          },
          data: {
            adopted: true
          }
        })
      }



      res.status(200).json(updatedAdoptionRequest);
    } catch (error) {
      console.error('Error updating adoption request:', error);
      res.status(500).json({ message: 'An error occurred while updating the adoption request' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
