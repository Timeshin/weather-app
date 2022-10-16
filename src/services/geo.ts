import axios, { AxiosInstance } from "axios"
import { IGetCityResponse } from "types/interfaces/services/geo.interface"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GEO_API_URL,
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST
  }
})

class GeoService {
  private readonly apiInstance: AxiosInstance

  constructor(api: AxiosInstance) {
    this.apiInstance = api
  }

  getMyCity = async (latitude: number, longitude: number) => {
    const lat = latitude > 0 ? latitude : -latitude
    const lon = longitude > 0 ? `+${longitude}` : -longitude
    
    const myCityResponse = await this.apiInstance.get<IGetCityResponse>('/cities', {
      params: {
        location: `${lat}${lon}`,
        limit: 1,
        minPopulation: 1000000
      }
    })

    return myCityResponse
  }
}

export default new GeoService(axiosInstance)
