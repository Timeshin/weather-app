import React from 'react'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Weather</title>
        <link rel="icon" href="./assets/images/weather.png" />
        <meta name="description" content='forecast app' />
      </Head>
      <Component {...pageProps} />
    </>
  )
    
}

export default MyApp
