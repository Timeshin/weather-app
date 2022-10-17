import React, { FC, useState } from 'react'
import { weekDays } from '../ForecastItem/ForecastItem.meta'
import Image from 'next/image'
import { IForecastList } from 'types/interfaces/services/weather.interface'
import { ForecastDropDown } from 'components'

interface IForecastItem {
  forecast: IForecastList
  showFullForecast?: boolean
}

const ForecastItem: FC<IForecastItem> = ({ forecast: { main, weather, dt_txt, dailyForecast }, showFullForecast }) => {
  const [openHoursForecast, setOpenHoursForecast] = useState(false)
  
  const onOpenForecastHandler = () => {
    if(!showFullForecast) return

    setOpenHoursForecast((prevValue) => !prevValue)
  }

  return (
    <>
      <div
        className={`
        flex justify-between items-center
        py-1 px-2
        bg-gray-200
        rounded-md
        w-full max-w-xl
        ${(showFullForecast && dailyForecast) && 'cursor-pointer hover:outline'}`
      }
        onClick={onOpenForecastHandler}
      >
        <div className='flex items-center gap-4'>
          <Image src={`/assets/images/${weather[0].icon}.png`} alt='icon' width={40} height={40} />
          <span>
            {weekDays[(new Date(dt_txt).getDay() % 8) || 1]}
          </span>
        </div>
        <div className='flex justify-center items-center gap-3'>
          <span>
            {weather[0].description}
          </span>
          <span className='opacity-50'>
            {Math.ceil(main.temp_max)}°C/{Math.ceil(main.temp_min)}°C
          </span>
          {
            (showFullForecast && dailyForecast) &&
              <div
              className={`h-0 w-0 border-x-8 border-x-transparent border-b-[10px] border-b-gray-600 ${openHoursForecast && 'rotate-180'}`}
              />
          }
        </div>
      </div>
      {
        (openHoursForecast && dailyForecast) && dailyForecast?.map((forecast) => <ForecastDropDown key={forecast.dt} forecast={forecast} />)
      }
    </>
  )
}


export default ForecastItem