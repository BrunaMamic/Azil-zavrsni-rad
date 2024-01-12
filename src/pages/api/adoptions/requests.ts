// pages/api/adoptions/requests.ts

import prisma from "../../../../lib/prisma";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    console.log(req.body);

    const { animalId, userId, ...requestData } = req.body;

    try {
      const adoptionReqExists = await prisma.adoptionRequest.findFirst({
        where: {
          animalId: animalId,
        },
      });

      if (!adoptionReqExists) {
        const newAdoptionRequest = await prisma.adoptionRequest.create({
          data: {
            animal: { connect: { id: animalId } },
            user: { connect: { id: 1 } },
            approved: false,
            timestamp: new Date(),
          },
        });
        res.status(201).json({message:"Adoption request submited" , newAdoptionRequest});
      }
      else res.status(200).json({
        message: "Adoption request for this animal already exists",
        
      })
    } catch (error) {
      console.error("Error creating adoption request:", error);
      res.status(500).json({
        message: "An error occurred while creating the adoption request",
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
