import React, { FC, useCallback, useEffect } from 'react'
import { useLocation } from 'hooks'
import { useStores } from '@mobx'
import { flowResult } from 'mobx'
import { GetServerSideProps } from 'next'
import { IForecastData, IWeatherData } from 'types/interfaces/services/weather.interface'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import WeatherServices from 'services/weather'

import { Button, WeatherCard, ForecastList } from 'components'


interface IcityNotFullForecast {
  forecast: IForecastData
  weather: IWeatherData
}

const cityNotFullForecast:FC<IcityNotFullForecast> = observer(({ forecast, weather }) => {
  const {
    geoStore
  } = useStores()
  const router = useRouter()

  useEffect(() => {
    if(typeof window === 'undefined') return
    if(
      router.query.cityNotFullForecast === geoStore.currentCity ||
      router.query.cityNotFullForecast === window.localStorage.getItem('city')
    ) return

    router.push(geoStore.currentCity)
  }, [geoStore.currentCity, router])

  const onChangeLocationHandler = (city: string) => {
    geoStore.setCurrentCity(city)
    
    router.push(`/${city}`)
  }

  return (
    <>
      <div className='flex justify-center gap-10'>
        {
          geoStore.cities.map((city) => (
            <Button
              key={city}
              onClick={() => onChangeLocationHandler(city)}
              value={city}
            />
          ))
        }
      </div>
      <WeatherCard clickableCard weather={weather} />
      <ForecastList forecast={forecast} />
    </>
  )
})

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { cityNotFullForecast } = params

  let weather: IWeatherData
  let forecast: IForecastData

  const [weatherResponse, forecastResponse] = await Promise.all([
    WeatherServices.getCityWeather(cityNotFullForecast as string),
    WeatherServices.getForecast(cityNotFullForecast as string)
  ])

  weather = weatherResponse
  forecast = forecastResponse

  return {
    props: {
      weather,
      forecast
    },
  }
}

export default cityNotFullForecast
