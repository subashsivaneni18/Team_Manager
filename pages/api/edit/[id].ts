import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if(req.method!=='PATCH')
    {
        res.status(400).send("The method is not patch")
    }

    try {
        const {id} = await req.query
        if(!id || typeof id!=='string')
        {
            return res.status(400).send("Invalid String")
        }
        const {name,email,role,mobileNo} = await req.body
        const isThere = await prisma.members.findUnique({
            where:{
                id:id
            }
        })

        if(!isThere)
        {
            return res.status(400).send("The Member is Missing")
        }

        const updatedMember = await prisma.members.updateMany({
            where:{
                id:id
            },
            data:{
                name,
                email,
                role,
                mobileNo
            }
        })
        return res.status(200).send(updatedMember)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}