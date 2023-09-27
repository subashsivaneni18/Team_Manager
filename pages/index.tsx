import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from "next/router";
import {getSession, signIn} from 'next-auth/react'
import { NextPageContext } from "next";






export default function Home() {


  
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const [variant,setVariant] = useState<'LOGIN'|'REGISTER'>('LOGIN')

  const toggle = useCallback(()=>{
    setVariant((e)=>e==='LOGIN'?'REGISTER':'LOGIN')
  },[])

    const router = useRouter()

    const login = useCallback(async() => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/team/team");
    } catch (error) {
      console.log(error);
    }
    }, [router,email,password]);

  const register = useCallback(async()=>{
    try {
      await axios.post('/api/register',{
        email,
        username,
        password
      })

      setVariant('LOGIN')
      
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong')
    }

  },[email,password,username,setVariant])

  

  return (
    <div>
      <div className="w-screen h-screen flex items-center justify-center bg-gray-800">
        <div className=" w-full md:w-[400px] h-full md:h-[550px] bg-black rounded-lg relative">
          <div>
            <p className="text-white text-3xl  px-6 pt-10 mb-3">{variant==='LOGIN'?'LOGIN':'REGISTER'}</p>
            <div className="w-full flex h-full flex-col justify-center gap-5 items-center mt-10">
              <Input
                id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
              />
              { variant==='REGISTER' && <Input
                id="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
              />}
              <Input
                id="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
              />

              <button className="
               bg-red-500
               text-white
               sm:w-[300px]
               w-[300px]
               px-4
               py-3
               rounded-lg
               font-semibold
               hover:bg-red-900
               transition
              "
              onClick={variant==='LOGIN'?login:register}
              >
                 {variant==='LOGIN'?'Login':'Register'}
              </button>

              <div>
                <p className="text-white font-semibold">
                  {variant==='LOGIN'?"Didn't Have an Account ? ":"Already have an Account? "}
                  <span className="hover:underline cursor-pointer" onClick={toggle} >
                    {variant==='LOGIN'?'Register':'Login'}
                  </span>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
