import axios, { AxiosInstance } from 'axios'
import { ICurrentWeather, IForecastData } from 'types/interfaces/services/weather.interface'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEATHER_API_URL,
  params: {
    appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY
  }
})

class WeatherServices {
  private readonly apiInstance: AxiosInstance

  constructor(api: AxiosInstance) {
    this.apiInstance = api
  }

  getCurrentWeather = async (cityName: string) => {
    const { data } = await this.apiInstance.get<ICurrentWeather>('/weather', {
      params: {
        q: cityName,
        units: 'metric'
      }
    })

    return data
  }

  getForecast = async (cityName: string) => {
    const { data } = await this.apiInstance.get<IForecastData>('/forecast', {
      params: {
        q: cityName,
        units: 'metric'
      }
    })


    return data
  }
}

export default new WeatherServices(axiosInstance)
