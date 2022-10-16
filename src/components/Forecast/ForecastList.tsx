import React, { FC, useMemo } from 'react'
import Image from 'next/image'
import { weekDays } from './Forecast.meta'
import { observer } from 'mobx-react-lite'
import { useStores } from '@mobx'
import { IForecastList } from 'types/interfaces/services/weather.interface'

interface IForecastListProps {
  showFullForecast?: boolean
}

const ForecastList: FC<IForecastListProps> = observer(({ showFullForecast }) => {
  const {
    weatherStore: {
      forecast
    }
  } = useStores()

  const filteredForecast = useMemo(() => {
    if(!forecast || showFullForecast) return

    const lastThreeDays = forecast.list.reduce((acc: IForecastList[], forecastItem) => {
      const date = new Date(forecastItem.dt_txt).getDay()

      if(!(date > 0 && date <= 3)) return acc

      const alreadyExistDay = acc.some((accForecast) => new Date(accForecast.dt_txt).getDay() === date)

      if(alreadyExistDay && acc.length) return acc

      return [...acc, forecastItem]
    }, [])

    return lastThreeDays
  }, [forecast, showFullForecast]) 

  if(!forecast) return null

  return (
    <div className='flex flex-col items-center justify-center mt-4 gap-2'>
      {
        filteredForecast.map(({ main, weather, dt, dt_txt }) => (
          <div key={dt} className='flex justify-between items-center py-1 px-2 bg-gray-200 rounded-md w-full max-w-xl'>
            <div className='flex items-center gap-4'>
              <Image src={`/assets/images/${weather[0].icon}.png`} alt='icon' width={40} height={40} />
              <span>{weekDays[new Date(dt_txt).getDay()]}</span>
            </div>
            <div className='flex justify-center gap-2'>
              <span>
                {weather[0].description}
              </span>
              <span className='opacity-50'>
                {Math.ceil(main.temp_max)}°C/{Math.ceil(main.temp_min)}°C
              </span>
            </div>
          </div>
        ))
      }
    </div>
  )
})

export default ForecastList