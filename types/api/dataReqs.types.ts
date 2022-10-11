import type {  Current, Hourly, Daily } from './formatGenericalData.types'

interface CityFound{
  found: string,
  local: Local
}

interface Local{
  name: string,
  lat: number,
  lon: number,
  country: string,
  state: string
}

interface CityNotFound{ found: string }

interface DataToUse{
  cod: number;
  weather: {
    current: Current;
    hourly: Hourly;
    daily: Daily;
  };
  localization: {
    city: string;
    state: string;
  }
}

interface DataFailed{ cod: number }

export type { Local, CityFound, CityNotFound, DataToUse, DataFailed }