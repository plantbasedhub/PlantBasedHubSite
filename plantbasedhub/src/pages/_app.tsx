import React from 'react'
import RootLayout from '../components/RootLayout'
import type { AppProps } from 'next/app'
import '../styles/home.module.css'
//import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
  )

}

export default MyApp