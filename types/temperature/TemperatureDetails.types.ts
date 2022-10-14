import type { NoRain, Rain, NoSnow, Snow } from '../submitCity/weatherStateReducer.types'

interface CompostTemperatureDetailsProps {
  children: {
    humidity: number;
    uvi: number;
    pop: number;
    rain: NoRain | Rain;
    snow: NoSnow | Snow
  }
}

interface TemperatureDetailsProps{
  uvi: number;
  humidity: number;
  rain: NoRain | Rain;
  snow: NoSnow | Snow
}

interface DetailsOnPreciptationProps{
  uvi: number;
  humidity: number;
  pop: number;
  children: string;
}

interface DetailsOnClearWeatherProps{
  uvi: number;
  humidity: number;
}

interface DetailsProps {
  uvi: number;
  humidity: number;
  children?: JSX.Element
}

export type {
  CompostTemperatureDetailsProps,
  TemperatureDetailsProps,
  DetailsOnPreciptationProps,
  DetailsOnClearWeatherProps,
  DetailsProps
}