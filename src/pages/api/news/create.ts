import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function createNewsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { naslov, tekst } = req.body;

  if (req.method === "POST") {
    try {
      const createdAnnouncement = await prisma.announcement.create({
        data: {
          title: naslov,
          content: tekst,
          important: false, // Set the `important` value to false by default
          date: new Date().toISOString()
        },
      });

      res.status(201).json(createdAnnouncement);
    } catch (error) {
      console.error("Error creating announcement:", error);
      res.status(500).json({ message: "An error occurred while creating the announcement" });
    }
  }
}
