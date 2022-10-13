import axios, { AxiosInstance } from "axios";

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

  getAllCities = (latitude: number, longitude: number) => {
    const lat = latitude > 0 ? latitude : -latitude
    const lon = longitude > 0 ? `+${longitude}` : -longitude
    
    const response = this.apiInstance.get('/cities', { params: {location: `${lat}${lon}` } }).then((res) => {
      return res
    })

    return response
  }
}

export default new GeoService(axiosInstance)
