import axios, { AxiosInstance } from 'axios'
import { IForecastData, IWeatherData } from 'types/interfaces/services/weather.interface'

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

  getCityWeather = async (cityName: string) => {
    const { data } = await this.apiInstance.get<IWeatherData>('/weather', {
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
