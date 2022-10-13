import React, { useCallback, useEffect, useMemo, useState } from 'react'
import GeoService from 'services/geo'
import WeatherServices from 'services/weather'
import { AxiosError } from 'axios'
import { useLocation } from 'hooks'
import { Status } from 'types/common.type'
import { IErrorState } from 'types/interfaces/common/common.interface'
import { IForecastList, IGetForecastDataResponse, IWeatherData } from 'types/interfaces/services/services.interface'

import { Button, ErrorAlert, WeatherCard, Forecast } from 'components'

const MainPage = () => {
  const [cities, setСities] = useState<string[]>(['Minsk', 'Moscow', 'Bratislava'])
  const [currentCity, setCurrentCity] = useState('Minsk')
  const [status, setStatus] = useState<Status | null>(null)
  const [error, setError] = useState<IErrorState>(null)
  const [weather, setWeather] = useState<IWeatherData | null>(null)
  const [forecast, setForecast] = useState<IGetForecastDataResponse | null>(null)
  const location = useLocation()
  const threeDaysForecast = useMemo(() => {
    if(!forecast) return

    const lastThreeDays = forecast.list.reduce((acc: IForecastList[], forecast) => {
      const date = new Date(forecast.dt_txt).getDay()

      if(!(date > 0 && date <= 3)) return acc

      const alreadyExistDay = acc.some((accForecast) => new Date(accForecast.dt_txt).getDay() === date)

      if(alreadyExistDay && acc.length) return acc

      return [...acc, forecast]
    }, [])

    return lastThreeDays
  }, [forecast]) 

  const getMyCity = useCallback(() => {
    if(!location) return
  
    if(typeof location === 'string') {
      setError({
        message: location
      })

      setCurrentCity(window.localStorage.getItem('city'))

      return
    }

    GeoService.getMyCity(location.latitude, location.longitude)
      .then(({ data: { data } }) => {
        const cityResponse = data[0]

        setСities((pervCitiesValue) => {
          if(pervCitiesValue.some((city) => cityResponse.city === city)) {
            return pervCitiesValue
          }

          return [...pervCitiesValue, cityResponse.city]
        })

        return cityResponse.city
      })
      .then((city) => {
        if(!window.localStorage.getItem('city')) {
          setCurrentCity(city)
          window.localStorage.setItem('city', city)
        } else {
          // setTimeOut because of api limits
          setTimeout(() => {
            setCurrentCity(window.localStorage.getItem('city'))
          }, 1000)
        }
      })
      .catch(({ message, response }: AxiosError<{ message?: string }>) => {
        setError({
          message,
          data: response?.data?.message
        })
      })
  }, [location])

  const getWeatherData = useCallback(async () => {
    setStatus('pending')

    await Promise.all([
      WeatherServices.getCurrentWeather(currentCity),
      WeatherServices.getForecast(currentCity)
    ])
      .then(([weatherResponse, forecastResponse]) => {
        setWeather(weatherResponse)
        setForecast(forecastResponse)
      })
      .catch(({ message, response }: AxiosError<{ message?: string }>) => {
        setError({
          message,
          data: response?.data?.message
        })
      })
      .finally(() => {
        setStatus('done')
      })
  }, [currentCity])

  useEffect(() => {
    getWeatherData()
  }, [getWeatherData])

  const onChangeCityHandler = (city: string) => {
    window.localStorage.setItem('city', city)
    setCurrentCity(city)
  }

  useEffect(() => {
    getMyCity()
  }, [getMyCity])

  return (
    <div className='pb-4'>
      {error && 
        <ErrorAlert
          message={error.message}
          data={error?.data}
          clearError={() => setError(null)}
          />
      }
      <div className='flex justify-center gap-10 mt-10'>
        {
          cities.map((city) => (
            <Button
              key={city}
              onClick={() => onChangeCityHandler(city)}
              value={city}
            />
          ))
        }
      </div>
      {
        status === 'pending' ?
          <h1 className='flex justify-center align-center'>Loading...</h1>
          :
          (
            <>
              <WeatherCard weather={weather} />
              <Forecast forecast={threeDaysForecast} />
            </>
          )
      }
    </div>
  )
}

export default MainPage
