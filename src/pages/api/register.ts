// pages/api/register.ts

import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prisma from "../../../lib/prisma";

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { firstName, lastName, username, password } = req.body; // Extract firstName and lastName

  try {
    const existingUser = await prisma.user.findFirst({
      where: { username: username as string },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // USER ROLE 2 = USER
    // USER ROLE 1 = ADMIN
    const userRole = 2;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstName,   // Add firstName
        lastName,    // Add lastName
        username,
        password: hashedPassword,
        role: userRole as number
      }, 
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
}
