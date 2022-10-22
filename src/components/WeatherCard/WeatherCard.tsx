import React, { FC } from 'react'
import Image from 'next/image'
import { useStores } from '@mobx'
import { useRouter } from 'next/router'
import { IWeatherData } from 'types/interfaces/services/weather.interface'

interface IWeatherCard {
  weather: IWeatherData
  clickableCard?: boolean 
}

const WeatherCard: FC<IWeatherCard> = ({ clickableCard, weather }) => {
  const {
    geoStore: {
      currentCity
    }
  } = useStores()
  const router = useRouter()

  const onNavigateBackHandler = () => {
    if(!clickableCard) return

    router.push(`forecast/${currentCity}`)
  }

  if (!weather) return null

  return (
    <div className='flex justify-center mt-10'>
      <div
        className={`card min-w-sm max-w-sm border border-gray-100  transition-shadow test  shadow-lg hover:shadow-shadow-xl w-full bg-green-600 text-purple-50 rounded-md ${clickableCard && 'cursor-pointer border-2 border-solid hover:border-blue-600'}`}
        onClick={onNavigateBackHandler}  
      >
        <h2 className='text-md mb-2 px-4 pt-4'>
          <div className='flex justify-between'>
            <div className='badge relative top-0'>
              <span className='mt-2 py-1 h-12px text-md font-semibold w-12px  rounded right-1 bottom-1 px-4'>
                {weather.name}
              </span>
              <p className='px-4'>
                {weather.weather[0].description}
              </p>
            </div>
          </div>
        </h2>
      
        <div className='flex items-center p-4'>
          <div className='flex justify-center items-center w-96'>
            <Image src={`/assets/images/${weather.weather[0].icon}.png`} alt='icon' width={128} height={128} />
          </div>
        </div>
        <div className='text-md pt-4 pb-4 px-4'>
          <div className='flex justify-between items-center'>
            <div className='space-y-2'>
              <span className='flex space-x-2 items-center'>
                <Image src='/assets/images/windy.png' alt='icon' width={24} height={24} />{' '}
                <span>
                  {weather.wind.speed} km/h
                </span>
              </span>
              <span className='flex space-x-2 items-center'>
                <Image src='/assets/images/rainDrop.png' alt='icon' width={24} height={24} />
                <span>{weather.main.humidity}%</span>
              </span>
            </div>
            <div>
              <h1 className='text-6xl'>{Math.ceil(weather.main.temp)}°C</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard