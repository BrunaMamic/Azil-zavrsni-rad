import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function updateNewsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if(!id){
    res.status(500).json({ message: "An error occurred while updating the announcement" });
  }

  if (req.method === "PATCH") {
    console.log('TEst Donation',req.body, id);
    
    try {
      if(!id){
        return res.status(500).json({ message: "An error occurred while updating the announcement" });
      }
      const numId = +id;
      const news = await prisma.announcement.update({
        where: { id: numId },
        data: {
          important: !req.body.important, // Toggle the `important` value
        },
      });

      res.status(200).json(news);
    } catch (error) {
      console.error("Error updating announcement:", error);
      res.status(500).json({ message: "An error occurred while updating the announcement" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.announcement.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
      console.error('Error deleting news:', error);
      res.status(500).json({ message: 'An error occurred while deleting the news' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
