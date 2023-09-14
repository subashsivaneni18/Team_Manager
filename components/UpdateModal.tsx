import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Input from './Input';
import useUpdateModal from '@/hooks/useUpdateModal';
import Modal from './Modal';
import axios from 'axios';
import useFetch from '@/hooks/useFetch';
import { members } from '@prisma/client';
import { useRouter } from 'next/router';
import useGetMembers from '@/hooks/useGetMembers';

const UpdateModal = () => {

  const router = useRouter()

  
   const {cardId} = router.query

   console.log(cardId)
   

    
  const {mutate} = useGetMembers()
  

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [role,setRole] = useState('')
    const [mobileNo,setMobileNo] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const updateModal = useUpdateModal()

    const handleUpdate = useCallback(async()=>{
        try {
          await axios.patch(`/api/edit/${cardId}`,{
            email,
            name,
            role,
            mobileNo
          })
          updateModal.onClose()
          mutate()
        } catch (error) {
          console.log(error)
        }
    },[cardId,mutate,name,email,role,mobileNo])

    
   

    if(updateModal.isOpen===false)
    {
      return null
    }

    let x = name===null || email==='' || role===''||mobileNo===''


    const bodyContent = (
      <div className="flex flex-col justify-center items-center gap-4">
        <Input
          id="Name"
          label="Name"
          onChange={(e: any) => setName(e.target.value)}
          value={name}
        />
        <Input
          id="Email"
          label="Email"
          onChange={(e: any) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          id="Role"
          label="Role"
          onChange={(e: any) => setRole(e.target.value)}
          value={role}
        />
        <Input
          id="MobileNo"
          label="MobileNo"
          onChange={(e: any) => setMobileNo(e.target.value)}
          value={mobileNo}
        />

        <button 
        onClick={()=>handleUpdate()}
        disabled={x}
        className={`text-white font-semibold text-xl bg-sky-500 hover:bg-sky-800 px-3 py-1 mt-2 rounded-lg transition max-w-[300px] w-[300px] cursor-pointer ${x && "cursor-not-allowed"}`}>Update</button>
      </div>
    );


    
    

  return (
    <div>
      <Modal 
      isOpen={updateModal.isOpen} 
      onClose={updateModal.onClose} 
      disabled={isLoading} 
      onSubmit={()=>{}} 
      title='Update' 
      body={bodyContent}
      />
    </div>
  );
}

export default UpdateModal
