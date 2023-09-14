import React, { useCallback, useState } from 'react'
import Modal from './Modal'
import useCreateModal from '@/hooks/useCreateModal'
import Input from './Input'
import axios from 'axios'
import useGetMembers from '@/hooks/useGetMembers'

const CreateModal = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const createModal = useCreateModal()

    const [isLoading,setIsLoading] = useState(false)

    const {mutate:members} = useGetMembers()

    const create = useCallback(async () => {
      try {
        setIsLoading(true)
        await axios.post("/api/create", {
          name,
          email,
          role,
          mobileNo
        });
        createModal.onClose()
        members()
        setIsLoading(false)
        setName('')
        setEmail('')
        setRole('')
        setMobileNo('')
      } catch (error) {
        console.log(error);
      }
    }, [name,email,role,mobileNo,members,setEmail,setMobileNo,setName,setRole]);

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
          onClick={()=>create()}
          className="text-white font-semibold text-xl bg-sky-500 hover:bg-sky-800 px-3 py-1 mt-2 rounded-lg transition max-w-[300px] w-[300px]">
            create
          </button>
        </div>
      );


  return (
    <div>
      <Modal
       title='Create'
       disabled={isLoading}
       isOpen={createModal.isOpen}
       onClose={createModal.onClose}
       body={bodyContent}
       onSubmit={()=>create()}
      />
    </div>
  )
}

export default CreateModal
