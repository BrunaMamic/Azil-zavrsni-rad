import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function updateAnimal(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method === "PUT") {
    try {
      const updatedAnimal = await prisma.animal.update({
        where: { id: Number(id) },
        data: {
          species: req.body.species,
          name: req.body.name,
          image: req.body.image,
          isChiped: Boolean(req.body.isChiped),
          age: +req.body.age,
          description: req.body.description,
          vetVisit: req.body.vetVisit,
          adopted: req.body.adopted,
        },
      });

      res.status(200).json(updatedAnimal);
    } catch (error) {
      console.error("Error updating animal:", error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the animal" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method === "DELETE") {
    try {
      await prisma.adoptionRequest.deleteMany({
        where: {
          animalId: Number(id),
        },
      });
      await prisma.animal.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ message: "Animal deleted successfully" });
    } catch (error) {
      console.error("Error deleting animal:", error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the animal" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
