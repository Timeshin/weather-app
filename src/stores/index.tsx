import { createContext, useContext } from 'react'
import { enableStaticRendering } from 'mobx-react-lite'
import GeoStore from './geoStore'
import ErrorStore from './errorStore'

enableStaticRendering(typeof window === 'undefined')

export class RootStore {
  geoStore: GeoStore

  errorStore: ErrorStore

  constructor() {
    this.geoStore = new GeoStore(this)
    this.errorStore = new ErrorStore(this)
  }
}

const StoreContext = createContext(new RootStore())

export const useStores = () => useContext(StoreContext)
