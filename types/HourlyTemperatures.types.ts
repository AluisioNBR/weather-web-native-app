import type { HourWeather } from '../types/submitCity/weatherStateReducer.types'

interface HourlyTemperaturesProps{
  visibility: boolean;
  children: any[] | HourWeather[]
}

export type { HourlyTemperaturesProps }