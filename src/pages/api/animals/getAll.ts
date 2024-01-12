import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function getAllAnimalsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const animals = await prisma.animal.findMany();
    res.status(200).json(animals);
  } catch (error) {
    console.error("Error fetching animals:", error);
    res.status(500).json({ message: "An error occurred while fetching animals" });
  }
}

