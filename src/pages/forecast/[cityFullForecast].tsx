import React, { ChangeEvent, FC, useState } from 'react'
import { GetServerSideProps } from 'next'
import WeatherServices from 'services/weather'
import { IWeatherData, IForecastData } from 'types/interfaces/services/weather.interface'
import Head from 'next/head'
import { useStores } from '@mobx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button, ForecastList, WeatherCard } from 'components'

interface ICityFullForecast {
  forecast: IForecastData
  weather: IWeatherData
  cityFullForecast: string
}

const CityFullForecast: FC<ICityFullForecast> = ({ forecast, weather, cityFullForecast }) => {
  const router = useRouter()
  const { geoStore } = useStores()
  const [searchValue, setSearchValue] = useState('')
  
  const onSearchCityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const onClickHandler = () => {
    if(cityFullForecast.toLocaleLowerCase() === searchValue.toLocaleLowerCase() && searchValue.trim()) return

    router.push(`${searchValue}`)
  }

  return (
    <>
      <Head>
        <title>{forecast.city.name}</title>
        <meta name='description' content={`${forecast.city} forecast`} />
      </Head>
      <div className='absolute top-3 left-3 text-lg'>
        <Link href={`/${geoStore.currentCity}`}>Go back</Link>
      </div>
      <div className='flex flex-col items-center'>
        <div className='flex items-center gap-4'>
          <input
            type='text'
            onChange={onSearchCityHandler}
            value={searchValue}
            className='w-full max-w-xl rounded-md'
          />
          <Button value='Search' onClick={onClickHandler} />
        </div>
        <h1 className='mt-5 text-4xl'>
          {forecast.city.name}
        </h1>
        <WeatherCard weather={weather} />
        <ForecastList showFullForecast forecast={forecast} />
      </div>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { cityFullForecast } = params
  let weather: IWeatherData
  let forecast: IForecastData

  const [weatherResponse, forecastResponse] = await Promise.all([
    WeatherServices.getCityWeather(cityFullForecast as string),
    WeatherServices.getForecast(cityFullForecast as string)
  ])

  weather = weatherResponse
  forecast = forecastResponse

  return {
    props: {
      weather,
      forecast,
      cityFullForecast
    },
  }
}

export default CityFullForecast