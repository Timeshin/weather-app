import { ICityData, ICords, ISys } from "./interfaces/services/services.interface"

export type CityForecast = Omit<ISys, 'type'> & Pick<ICityData, | 'name' | 'population'> & ICords & { timezone: number }
