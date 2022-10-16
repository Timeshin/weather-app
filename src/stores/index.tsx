import { createContext, ReactNode, useContext } from 'react'
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

let store: RootStore

function initializeStore(): RootStore {
  const _store = store ?? new RootStore();

  if (typeof window === "undefined") return _store;

  if (!store) store = _store;

  return _store;
}

const StoreContext = createContext(new RootStore())

export const useStores = () => useContext(StoreContext)

export function RootStoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const store = initializeStore()

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
