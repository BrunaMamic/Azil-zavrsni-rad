// api/users/[id].ts

import prisma from '../../../../lib/prisma';

export default async function handler(req:any, res:any) {
  const { id } = req.query;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'An error occurred while fetching the user' });
  }
}
