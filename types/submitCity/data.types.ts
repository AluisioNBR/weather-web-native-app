import type { CurrentWeather, HourWeather, DayWeather } from './weatherStateReducer.types'

interface FoundDataOfRequest{
  cod: number;
  city: string;
  state: string;
  current: CurrentWeather;
  hourly: HourWeather[];
  daily: DayWeather[];
}

interface NotFoundDataOfRequest{
  cod: number;
  msg: string
}

export type { FoundDataOfRequest, NotFoundDataOfRequest }