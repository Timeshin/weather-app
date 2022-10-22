import { CityForecast } from "types/services.type"

interface ITemperature {
  feels_like: number
  grnd_level: number
  temp: number
  humidity: number
  pressure: number
  sea_level: number
  temp_min: number
  temp_max: number
}

export interface ISys {
  country: string
  id: number
  sunrise: number
  sunset: number
  type: number
}

interface IWeather {
  description: string
  icon: string
  id: number
  main: string
}

interface IWind {
  deg: number
  gust: number
  speed: number
}

export interface ICords {
  lon: number
  lat: number
}

export interface IWeatherData {
  base: string
  clouds: {
    all: number
  }
  dt: number
  dt_txt: string
  cod: number
  coord: ICords
  id: number
  main: ITemperature
  name: string
  sys: ISys
  timezone: number
  visibility: number
  weather: IWeather[]
  wind: IWind
}

export interface IForecastList {
  clouds: {
    all: number
  }
  dt: number
  dt_txt: string
  main: ITemperature
  pop: number
  sys: {
    pod: string
  }
  visibility: number
  weather: IWeather[]
  wind: IWind
  dailyForecast?: IForecastList[]
  weekDay?: string
}

export interface IForecastData {
  city: CityForecast
  cnt: number
  cod: string
  list: IForecastList[]
  message: number
}
