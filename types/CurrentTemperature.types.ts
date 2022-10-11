import type { CurrentWeather } from './submitCity/weatherStateReducer.types'

interface CurrentTemperatureProps{
  msg: string,
  visibility: boolean,
  loadingWeather: boolean,

  city: string,
  state: string,
  children: CurrentWeather,
}

interface LocalizationProps{
  city: string,
  state: string
}

export type {
  CurrentTemperatureProps,
  LocalizationProps
}