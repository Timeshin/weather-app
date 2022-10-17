import { AxiosError } from 'axios'
import { flow, makeAutoObservable } from 'mobx'
import { RootStore } from './index'
import geo from 'services/geo'

class GeoStore {
  currentCity = 'Minsk'

  cities = ['Minsk', 'Moscow', 'Bratislava']

  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this, {
      getMyCity: flow
  })
  }

  setCurrentCity(city: string) {
    this.currentCity = city
    window.localStorage.setItem('city', city)
  }

  *getMyCity(latitude: number, longitude: number) {
    try {
      const { data: { data } } = yield geo.getMyCity(latitude, longitude)
      const cityResponse = data[0] 
      
      if(!window.localStorage.getItem('city')) {
        this.setCurrentCity(cityResponse.city)
        window.localStorage.setItem('city', cityResponse.city)
      } else {
        // setTimeOut because of api limits
        setTimeout(() => {
          this.setCurrentCity(window.localStorage.getItem('city'))
        }, 1000)
      }
      
      if(this.cities.some((city) => cityResponse.city === city)) return
      
      this.cities = [...this.cities, cityResponse.city]
    } catch (error) {
      const { message, response } = error as AxiosError<{ message?: string }>
      
      this.rootStore.errorStore.errorOccured(message, response?.data?.message)
    }
  }
}

export default GeoStore
