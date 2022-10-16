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
