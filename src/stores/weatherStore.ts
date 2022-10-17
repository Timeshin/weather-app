import { RootStore } from './index'
import { flow, makeAutoObservable } from 'mobx'
import WeatherServices from 'services/weather'
import { IWeatherData, IForecastData } from 'types/interfaces/services/weather.interface'
import { AxiosError } from 'axios'
import { Status } from 'types/common.type'

class WeatherStore {
  rootStore: RootStore

  weather: IWeatherData = null

  forecast: IForecastData = null

  status: Status = 'done'

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this, {
      getWeatherData: flow
    })
  }

  setWeather(weather: IWeatherData) {
    this.weather = weather
  }

  setForecast(forecast: IForecastData) {
    this.forecast = forecast
  }

  *getWeatherData(city?: string) {
    const currentCity = city || this.rootStore.geoStore.currentCity

    this.status = 'pending'

    try {
      const [weatherResponse, forecastResponse] = yield Promise.all([
        WeatherServices.getCityWeather(currentCity),
        WeatherServices.getForecast(currentCity)
      ])

      this.weather = weatherResponse
      this.forecast = forecastResponse
    } catch (error) {
      const { message, response } = error as AxiosError<{ message?: string }>
      
      this.rootStore.errorStore.errorOccured(message, response?.data?.message)
    } finally {
      this.status = 'done'
    }
  }
}

export default WeatherStore
