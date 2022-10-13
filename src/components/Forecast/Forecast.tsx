import React, { FC } from 'react'
import Image from 'next/image'
import { IForecastList } from 'types/interfaces/services/services.interface'
import { weekDays } from './Forecast.meta'

interface IForecast {
  forecast: IForecastList[]
}

const Forecast: FC<IForecast> = ({ forecast }) => {
  
  if(!forecast) return null

  console.log(forecast)

  return (
    <div className='flex flex-col items-center justify-center mt-4 gap-2'>
      {
        forecast.map(({ main, weather, dt, dt_txt }) => (
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
}

export default Forecast