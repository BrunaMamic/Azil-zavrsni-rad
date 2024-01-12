import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)
    console.log(session);
    
    const { firstName, lastName, email, message, messageType } = req.body;
    console.log(req.body);
    

    try {
      const user = await prisma.user.findFirst({
        where: {
          username: session.user.username,
        }
      })
      if(user){

        const createdMessage = await prisma.message.create({
          data: {
            user: { connect: { id: user.id } }, 
            message,
            timestamp: new Date().toISOString(),
            messageType: messageType
          },
        });
  
        res.status(201).json(createdMessage);

      }
      
    } catch (error) {
      console.error('Error creating message:', error);
      res
        .status(500)
        .json({ message: 'An error occurred while creating the message' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
