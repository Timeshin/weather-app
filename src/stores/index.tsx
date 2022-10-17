import { createContext, useContext } from 'react'
import { enableStaticRendering } from 'mobx-react-lite'
import WeatherStore from './weatherStore'
import GeoStore from './geoStore'
import ErrorStore from './errorStore'

enableStaticRendering(typeof window === 'undefined')

export class RootStore {
  geoStore: GeoStore

  weatherStore: WeatherStore

  errorStore: ErrorStore

  constructor() {
    this.geoStore = new GeoStore(this)
    this.weatherStore = new WeatherStore(this)
    this.errorStore = new ErrorStore(this)
  }
}

const StoreContext = createContext(new RootStore())

export const useStores = () => useContext(StoreContext)
