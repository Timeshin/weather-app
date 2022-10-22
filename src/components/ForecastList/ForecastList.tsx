import React, { FC, useMemo } from 'react'
import { IForecastData, IForecastList } from 'types/interfaces/services/weather.interface'

import { ForecastItem } from 'components'

interface IForecastListProps {
  forecast: IForecastData
  showFullForecast?: boolean
}

const ForecastList: FC<IForecastListProps> = ({ showFullForecast, forecast }) => {
  const filteredForecast = useMemo(() => {
    if(!forecast) return

    const forecastDays = forecast.list.reduce((acc: IForecastList[], forecastItem) => {
      const currentDate = new Date().getDate()
      let date = new Date(forecastItem.dt_txt).getDate() - currentDate

      date = (date !== 0 && date % 6 === 0) ? 0 : date

      if(!(date >= 0 && (date < 3 || showFullForecast))) return acc

      const alreadyExistDay = acc.some((accForecast) => new Date(accForecast.dt_txt).getDate() - currentDate === date)

      if(alreadyExistDay && acc[date]) {
        acc[date].dailyForecast = [...acc[date].dailyForecast || [], forecastItem]
      }

      if(alreadyExistDay && acc.length) return acc

      const weekDay = new Date(forecastItem.dt_txt).toLocaleString(
        'default', { weekday: 'long' }
      )

      return [...acc, {...forecastItem, weekDay }]
    }, [])

    return forecastDays
  }, [forecast, showFullForecast])

  if(!forecast) return null

  return (
    <div className='flex flex-col items-center justify-center mt-8 gap-2 w-full'>
      {
        filteredForecast.map((forecast) => (
          <ForecastItem key={forecast.dt} forecast={forecast} />
        ))
      }
    </div>
  )
}

export default ForecastList