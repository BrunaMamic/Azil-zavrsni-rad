// pages/api/donations/create.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { MessageType } from "@/constants/enums";

export default async function createDonation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)


  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: session.user.username
      }
    })

    if(user){
      const newDonation = await prisma.donation.update({
        where: {
            id: id
        },
        data: {
          isDonated: true,
          user: {connect: {id: user.id}}
        }
      });
  
      const donationMessage = await prisma.message.create({
        data: {
          user: { connect: { id: user.id } },
          timestamp: new Date().toISOString(),
          messageType: MessageType.Donation,
          message: `Osoba ${user.firstName} ${user.lastName} je napavila donaciju`
        },
      })
  
      res.status(201).json({ message: "Donation created successfully", newDonation });
    
    }

    } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ message: "An error occurred while creating donation" });
  }
}
