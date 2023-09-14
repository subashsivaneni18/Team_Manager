import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(404).send("The Method is not Get");
  }

  try {
    await serverAuth(req, res);
    const {cardId} = await req.query;
    if (!cardId || typeof cardId !== "string") {
      return res.status(400).send("Id is Invalid");
    }
    const member = await prisma.members.findUnique({
      where: {
        id: cardId,
      },
    });

    if (!member) {
      res.status(400).send("Member Not Found");
    }

    return res.status(200).send(member);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
}
