import React, { FC } from 'react'
import { GetServerSideProps } from 'next'
import { IGetForecastDataResponse, IWeatherData } from 'types/interfaces/services/services.interface'

interface ICity {
  weather: IWeatherData
  forecast: IGetForecastDataResponse
}

const City: FC<ICity> = ({ forecast, weather }) => {

  return (
    <div>City</div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  

  return {
    props: {
      params
    }
  }
}

export default City