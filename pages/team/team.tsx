import Card from '@/components/Card';
import Navbar from '@/components/Navbar'
import useCurrentUser from '@/hooks/useCurrentUser';
import useGetMembers from '@/hooks/useGetMembers';
import { members } from '@prisma/client';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  

  return {
    props: {},
  };
}







const team = () => {

  const {data:currentUser} = useCurrentUser()
  const {data:members} = useGetMembers()
  
  console.log(members)
 

  return (
    <div className="w-screen h-full ">
      <Navbar />
      <div className="relative top-[70px]  flex flex-wrap justify-evenly gap-8">
        {members?.map((x:members) => (
          <div key={x.id}>
            <Card id={x.id} Name={x.name} Email={x.email} MobileNo={x.mobileNo} Role={x.role} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default team
