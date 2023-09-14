import CreateModal from '@/components/CreateModal';
import UpdateModal from '@/components/UpdateModal';
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'

export default function App({ Component, 
  pageProps:{
    session,
    ...pageProps
  }
}: AppProps) {

  

  return (
    <>
      <SessionProvider session={session}>
        <UpdateModal />
        <CreateModal/>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
