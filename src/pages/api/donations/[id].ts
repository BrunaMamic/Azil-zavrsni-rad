import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function deleteDonationByIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const donationId = parseInt(req.query.id as string, 10);

  try {
    const deletedDonation = await prisma.donation.delete({
      where: { id: donationId },
    });

    res.status(200).json({ message: 'Donation deleted successfully', deletedDonation });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({ message: 'An error occurred while deleting the donation' });
  }
}
