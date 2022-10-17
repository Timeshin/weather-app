import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import WeatherServices from 'services/weather'
import { IWeatherData, IForecastData } from 'types/interfaces/services/weather.interface'
import { observer } from 'mobx-react-lite'
import { useStores } from '@mobx'
import Head from 'next/head'
import { Button, ForecastList, WeatherCard } from 'components'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface ICityForecast {
  forecast: IForecastData
  weather: IWeatherData
  city: string
}

const CityForecast: FC<ICityForecast> = observer(({ forecast, weather, city }) => {
  const { weatherStore } = useStores()
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    weatherStore.setForecast(forecast)
    weatherStore.setWeather(weather)
  }, [forecast, weather, weatherStore])
  
  const onSearchCityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const onClickHandler = () => {
    if(city.toLocaleLowerCase() === searchValue.toLocaleLowerCase() && searchValue.trim()) return

    router.push(`/${searchValue}`)
  }

  return (
    <>
      <Head>
        <title>{forecast.city.name}</title>
        <meta name='description' content={`${forecast.city} forecast`} />
      </Head>
      <div className='absolute top-3 left-3 text-lg'>
        <Link href='/'>Go back</Link>
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
        <WeatherCard />
        <ForecastList showFullForecast />
      </div>
    </>
  )
})


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { city } = params
  let weather: IWeatherData
  let forecast: IForecastData

  const [weatherResponse, forecastResponse] = await Promise.all([
    WeatherServices.getCityWeather(city as string),
    WeatherServices.getForecast(city as string)
  ])

  weather = weatherResponse
  forecast = forecastResponse

  return {
    props: {
      weather,
      forecast,
      city
    },
  }
}

export default CityForecast