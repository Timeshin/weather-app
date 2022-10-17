import React, { FC } from 'react'
import Image from 'next/image'
import { IForecastList } from 'types/interfaces/services/weather.interface'
import { convertNumberToTime } from 'utils'

interface IForecastDropDown {
  forecast: IForecastList
}

const ForecastDropDown: FC<IForecastDropDown> = ({ forecast: { main, weather, dt_txt } }) => (
  <div
    className='
    flex justify-between items-center
    py-1 px-2
    bg-gray-200
    rounded-md
    w-full max-w-xl
    ml-10'
  >
    <div className='flex items-center gap-4'>
      <Image src={`/assets/images/${weather[0].icon}.png`} alt='icon' width={40} height={40} />
      <span>
        {convertNumberToTime(new Date(dt_txt).getHours())}
      </span>
    </div>
    <div className='flex justify-center items-center gap-3'>
      <span>
        {weather[0].description}
      </span>
      <span className='opacity-50'>
        {Math.ceil(main.temp_max)}°C/{Math.ceil(main.temp_min)}°C
      </span>
    </div>
  </div>
)

export default ForecastDropDown