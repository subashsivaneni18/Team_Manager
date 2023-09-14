import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if(req.method!=='DELETE')
    {
        return res.status(404).send("The Method is not Delete")
    }

    try {
       await serverAuth(req,res) 
       
       const {cardId} = await req.body

       await prisma?.members.delete({
        where:{
            id:cardId
        }
       })

       res.status(200).send("Member Deleted")

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Error")
    }
}