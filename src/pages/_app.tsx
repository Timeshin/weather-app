import React, { useEffect } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import '../styles/globals.css'

interface IPageProps {
  error: {
    statusCode: string
    message: string
  }
}

const MyApp = ({ Component, pageProps }: AppProps<IPageProps>) => (
    <>
      <Head>
        <title>Weather</title>
        <link rel="icon" href="/assets/images/weather.png" />
        <meta name="description" content='forecast app' />
      </Head>
      <Component {...pageProps} />
    </>
  )


export default MyApp
