import { ICityData } from "./interfaces/services/geo.interface"
import { ICords, ISys } from "./interfaces/services/weather.interface"

export type CityForecast = Omit<ISys, 'type'> & Pick<ICityData, | 'name' | 'population'> & ICords & { timezone: number }
