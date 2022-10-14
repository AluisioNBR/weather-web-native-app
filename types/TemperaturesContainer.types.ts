import type { HourWeather, DayWeather } from './submitCity/weatherStateReducer.types'

interface TemperaturesContainerProps {
  isVisible: boolean;
  children: any[] | HourWeather[] | DayWeather[]
}

export type { TemperaturesContainerProps }