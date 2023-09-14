import React from 'react'
import {create} from 'zustand'

interface UpdateStoreProps{
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void,

}


const useUpdateModal = create<UpdateStoreProps>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}))


export default useUpdateModal