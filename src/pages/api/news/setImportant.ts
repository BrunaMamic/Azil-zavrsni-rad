import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function updateNewsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, important } = req.body;
  if (req.method === "PATCH") {
    console.log("TEst Donation", req.body, id);

    if (!id) {
      return res
        .status(500)
        .json({ message: "An error occurred while updating the announcement" });
    }

    try {
      const news = await prisma.announcement.update({
        where: { id: id },
        data: {
          important: !important, // Toggle the `important` value
        },
      });

      res.status(200).json(news);
    } catch (error) {
      console.error("Error updating announcement:", error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the announcement" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
