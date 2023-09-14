import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'
import serverAuth from "@/libs/serverAuth";

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if(req.method!=='GET')
    {
        return res.status(200).send("The Method is not Get")
    }

    try {
       const {currentUser} = await serverAuth(req,res)

       const members = await prisma.members.findMany({
        where:{
            userId:currentUser?.id
        }
       })
       return res.status(200).json(members)
    } catch (error) {
        console.log(error)
        res.status(500).send("This is server error")
    }
}