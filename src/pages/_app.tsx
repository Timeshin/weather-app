import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import { ErrorAlert } from 'components'

interface IPageProps {
  error: {
    statusCode: string
    message: string
  }
}

function MyApp({ Component, pageProps }: AppProps<IPageProps>) {
  return (
    <>
      <Head>
        <title>Weather</title>
        <link rel="icon" href="/assets/images/weather.png" />
        <meta name="description" content='forecast app' />
      </Head>
      {
        pageProps.error && <ErrorAlert  />
      }
      <Component {...pageProps} />
    </>
  )
    
}

export default MyApp
