import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { observer } from 'mobx-react-lite'
import { RootStoreProvider, useStores } from '@mobx'

import { ErrorAlert } from 'components'

import '../styles/globals.css'

interface IPageProps {
  error: {
    statusCode: string
    message: string
  }
}

const MyApp = observer(({ Component, pageProps }: AppProps<IPageProps>) => { 
  const {
    errorStore: {
      showErrorMessage
    }
  } = useStores()
  
  return (
    <RootStoreProvider>
      <Head>
        <title>Weather</title>
        <link rel="icon" href="/assets/images/weather.png" />
        <meta name="description" content='forecast app' />
      </Head>
      {
        showErrorMessage && <ErrorAlert />
      }
      <Component {...pageProps} />
    </RootStoreProvider>
  )
})

export default MyApp
