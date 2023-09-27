import React, { useCallback } from 'react'
import { signOut} from 'next-auth/react'
import useCreateModal from '@/hooks/useCreateModal';
import axios from 'axios';






const Navbar = () => {

  const createModal = useCreateModal()


  return (
    <div className="w-screen h-[50px] bg-black flex items-center fixed z-50">
      <div className="  w-full h-[35px] mx-7 flex items-center justify-between">
        <div className="text-white font-semibold">Teamer</div>

        <div className="flex gap-5">
          <div
            onClick={() => signOut()}
            className="font-semibold text-white bg-red-500 px-2 py-1 rounded-md cursor-pointer hover:bg-red-800 transition"
          >
            Logout
          </div>

          <div 
           onClick={createModal.onOpen}
          className="font-semibold text-white bg-sky-500 px-2 py-1 rounded-md cursor-pointer hover:bg-sky-800 transition">
            Create
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar
