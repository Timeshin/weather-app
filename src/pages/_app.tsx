import React, { useCallback, useEffect } from 'react'
import Head from 'next/head'
import { useLocation } from 'hooks'
import { flowResult } from 'mobx'
import { useStores } from '@mobx'
import type { AppProps } from 'next/app'

import { ErrorWrapper } from 'components'

import '../styles/globals.css'

interface IPageProps {
  error: {
    statusCode: string
    message: string
  }
}

const MyApp = ({ Component, pageProps }: AppProps<IPageProps>) => {
  const { geoStore } = useStores()
  const location = useLocation()
  const getMyCity = useCallback(() => {
    if(!location) return

    if(typeof location === 'string') {
      geoStore.setCurrentCity(window.localStorage.getItem('city') || 'Minsk')

      return
    }

    flowResult(geoStore.getMyCity(location.latitude, location.longitude))
  }, [geoStore, location])

  useEffect(() => {
    getMyCity()
  }, [getMyCity])

  return (
    <ErrorWrapper>
      <Head>
        <title>Weather</title>
        <link rel="icon" href="/assets/images/weather.png" />
        <meta name="description" content='forecast app' />
      </Head>
      <div className='mt-10'>
        <Component {...pageProps} />
      </div>
    </ErrorWrapper>
  )
}


export default MyApp
