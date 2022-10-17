import React, { useEffect } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { observer } from 'mobx-react-lite'
import { useStores } from '@mobx'

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
    errorStore
  } = useStores()

  useEffect(() => {
    if(!pageProps.error) return

    errorStore.errorOccured(pageProps.error.statusCode, pageProps.error.message)
  }, [errorStore, pageProps.error])
  
  return (
    <>
      <Head>
        <title>Weather</title>
        <link rel="icon" href="/assets/images/weather.png" />
        <meta name="description" content='forecast app' />
      </Head>
      {
        errorStore.showErrorMessage && <ErrorAlert />
      }
      <div className='my-4'>
        <Component {...pageProps} />
      </div>
    </>
  )
})

export default MyApp
