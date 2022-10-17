import React, { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '@mobx'
import { IForecastList } from 'types/interfaces/services/weather.interface'

import { ForecastItem } from 'components'
import { toJS } from 'mobx'

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
    if(!forecast) return

    const forecastDays = forecast.list.reduce((acc: IForecastList[], forecastItem) => {
      const date = new Date(forecastItem.dt_txt).getDay()

      if(!(date > 0 && (date <= 3 || showFullForecast))) return acc

      const alreadyExistDay = acc.some((accForecast) => new Date(accForecast.dt_txt).getDay() === date)
      
      if(showFullForecast && alreadyExistDay && acc[date - 1]) {
        acc[date - 1].dailyForecast = [...acc[date - 1].dailyForecast || [], forecastItem]
      }

      if(alreadyExistDay && acc.length) return acc


      return [...acc, forecastItem]
    }, [])

    return forecastDays
  }, [forecast, showFullForecast]) 

  if(!forecast) return null

  return (
    <div className='flex flex-col items-center justify-center mt-8 gap-2 w-full'>
      {
        filteredForecast.map((forecast) => (
          <ForecastItem key={forecast.dt} forecast={forecast} showFullForecast={showFullForecast} />
        ))
      }
    </div>
  )
})

export default ForecastList