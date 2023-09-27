import useCard from '@/hooks/useCard';

import useGetMembers from '@/hooks/useGetMembers';
import useUpdateModal from '@/hooks/useUpdateModal';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react'

interface CardProps{
  Name:string,
  Email:string,
  MobileNo:string,
  Role:string,
  id:string
}

const Card:React.FC<CardProps> = ({
  Name,
  Email,
  MobileNo,
  Role,
  id
}) => {

  const updateModal = useUpdateModal()
  const card  = useCard()
  const {mutate:members} = useGetMembers()

  const [cardId]= useState<string>(id)

  const router = useRouter()
  

  const remove = useCallback(async()=>{
        try {
            await axios.delete("/api/delete",{
              data:{cardId}
            });
            members()
        } catch (error) {
          console.log(error)
        }
  },[cardId,members])

  const handleClick = useCallback(async()=>{
      try {
        updateModal.onOpen()
        await router.push(`/team/${cardId}`)
      } catch (error) {
        console.log(error)
      }
  },[cardId,router,updateModal])



  return (
    <div className="max-w-[350px] h-[250px] bg-neutral-600 rounded-md flex items-center justify-center shadow-lg border-[1px] border-neutral-800">
      <div className="bg-neutral-600 md:w-[320px] min-h-[225px] p-3 m-3">
        <div className="flex h-full flex-col text-white font-semibold gap-2  ">
          <p>
            Name: <span>{Name}</span>
          </p>
          <p>
            Email: <span>{Email}</span>
          </p>
          <p>
            Mobile Number: <span>{MobileNo}</span>
          </p>
          <p>
            Role: <span>{Role}</span>
          </p>
          <div className="flex justify-between mt-10">
            <p
             onClick={()=>handleClick()}
             className="bg-sky-500 px-2 py-1 rounded-lg hover:bg-sky-900 cursor-pointer transition">
              Update
            </p>
            <p 
             onClick={()=>remove()}
            className="bg-red-500 px-2 py-1 rounded-lg hover:bg-red-800 cursor-pointer transition">
              Delete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card
