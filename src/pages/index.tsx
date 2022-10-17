import React, { useCallback, useEffect } from 'react'
import { useLocation } from 'hooks'
import { useStores } from '@mobx'
import { flowResult } from 'mobx'
import { observer } from 'mobx-react-lite'

import { Button, WeatherCard, ForecastList } from 'components'

const MainPage = observer(() => {
  const {
    errorStore,
    weatherStore,
    geoStore
  } = useStores()
  const location = useLocation()

  const getMyCity = useCallback(() => {
    if(!location) return
  
    if(typeof location === 'string') {
      errorStore.errorOccured(location)

      geoStore.setCurrentCity(window.localStorage.getItem('city') || 'Minsk')

      return
    }

    flowResult(geoStore.getMyCity(location.latitude, location.longitude))
  }, [errorStore, geoStore, location])

  useEffect(() => {
    getMyCity()
  }, [getMyCity])

  useEffect(() => {
    flowResult(weatherStore.getWeatherData())
  }, [weatherStore, geoStore.currentCity])

  return (
    <>
      <div className='flex justify-center gap-10 mt-10'>
        {
          geoStore.cities.map((city) => (
            <Button
              key={city}
              onClick={() => geoStore.setCurrentCity(city)}
              value={city}
            />
          ))
        }
      </div>
      {
        weatherStore.status === 'pending' ?
          <h1 className='flex justify-center align-center'>Loading...</h1>
          :
          (
            <>
              <WeatherCard clickableCard />
              <ForecastList />
            </>
          )
      }
    </>
  )
})

export default MainPage
