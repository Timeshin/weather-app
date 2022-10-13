import { CityForecast } from "types/services.type"

export interface ICityData {
  city: string
  country: string
  countryCode: string
  distance: number
  id: number
  latitude: number
  longitude: number
  name: string
  population: number
  region: string
  regionCode: string
  type: string
  wikiDataId: string
}

export interface IGetCityResponse {
  data: ICityData[]
}

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
  cod: number
  coord: ICords
  dt: number
  id: number
  main: ITemperature
  name: string
  sys: ISys
  timezone: number
  visibility: number
  weather: IWeather[]
  wind: IWind
}

export interface IGetCurrentWeatherResponse extends IWeatherData {
  clouds: {
    all: number
  }
  dt: number
  dt_txt: string
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
}

export interface IGetForecastDataResponse {
  city: CityForecast
  cnt: number
  cod: string
  list: IForecastList[]
  message: number
}
