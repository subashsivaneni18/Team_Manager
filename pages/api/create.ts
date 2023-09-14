import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).send("The Method is Not Post");
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const { name, email, role, mobileNo } = req.body;

    if (!name || !email || !role || !mobileNo) {
      return res.status(400).send("Enter all the Values");
    }

    const member = await prisma.members.create({
      data: {
        email: email as string,
        name: name as string,
        role: role as string,
        mobileNo: mobileNo as string,
        userId: currentUser?.id,
      },
    });

    if (!member) {
      return res.status(400).send("Member Not Created");
    }

    return res.status(200).json(member); // Send member as JSON response
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error"); // Handle errors with a 500 status code
  }
}
