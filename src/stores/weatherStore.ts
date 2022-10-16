import { RootStore } from './index'
import { flow, makeAutoObservable, runInAction } from 'mobx'
import WeatherServices from 'services/weather'
import { ICurrentWeather, IForecastData } from 'types/interfaces/services/weather.interface'
import { AxiosError } from 'axios'
import { Status } from 'types/common.type'

class WeatherStore {
  rootStore: RootStore

  weather: ICurrentWeather = null

  forecast: IForecastData = null

  status: Status = 'done'

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this, {
      getWeatherData: flow
    })
  }

  *getWeatherData() {
    const currentCity = this.rootStore.geoStore.currentCity

    this.status = 'pending'

    yield Promise.all([
      WeatherServices.getCurrentWeather(currentCity),
      WeatherServices.getForecast(currentCity)
    ])
      .then(([weatherResponse, forecastResponse]) => {
        this.weather = weatherResponse
        this.forecast = forecastResponse
      })
      .catch(({ message, response }: AxiosError<{ message?: string }>) => {
        this.rootStore.errorStore.errorOccured(message, response?.data?.message)
      })
      .finally(() => {
        runInAction(() => {
          this.status = 'done'
        })
      })
  }
}

export default WeatherStore
