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

  const { amount, description } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: session.user.username
      }
    })

    if(user){
      const newDonation = await prisma.donation.create({
        data: {
          amount,
          description,
          timestamp: new Date(),
          isDonated: false
        }
      });

      res.status(201).json({ message: "Donation created successfully", newDonation });
    
    }

    } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ message: "An error occurred while creating donation" });
  }
}
