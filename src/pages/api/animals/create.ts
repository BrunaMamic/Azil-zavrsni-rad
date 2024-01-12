// pages/api/animals/create.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {name, vrsta, godine, image, opis, pregled, cip, udomljen} = req.body;

  console.log(req.body)
  try {

    const createAnimal = await prisma.animal.create({
        data: {
            name: name,
            species: vrsta,
            age: +godine,
            image: image,
            description: opis,
            vetVisit: pregled,
            isChiped: cip,
            adopted: udomljen
        }
    })

    if(createAnimal){
        res
        .status(200)
        .json({ message: "Animal create successfully" , createAnimal});
    }

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
}