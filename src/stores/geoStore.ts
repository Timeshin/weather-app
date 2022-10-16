import { AxiosError } from 'axios'
import { action, flow, makeAutoObservable } from 'mobx'
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
    yield geo.getMyCity(latitude, longitude)
      .then(({ data: { data } }) => {
        const cityResponse = data[0]

        if(this.cities.some((city) => cityResponse.city === city)) {
          return cityResponse.city
        }

        this.cities = [...this.cities, cityResponse.city]

        return cityResponse.city
      })
      .then((city) => {
        if(!window.localStorage.getItem('city')) {
          this.setCurrentCity(city)
          window.localStorage.setItem('city', city)
        } else {
          // setTimeOut because of api limits
          setTimeout(() => {
            this.setCurrentCity(window.localStorage.getItem('city'))
          }, 1000)
        }
      })
      .catch(({ message, response }: AxiosError<{ message?: string }>) => {
        this.rootStore.errorStore.errorOccured(message, response?.data?.message)
      })
    }
  }

export default GeoStore
