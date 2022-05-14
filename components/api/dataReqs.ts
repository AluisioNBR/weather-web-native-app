import axios from 'axios'
import { splitWeatherDataType } from './formatGenericalData'
import type { Data, Current, Hourly, Daily } from './formatGenericalData'

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

async function returnGeocodingLocalization(city: string): Promise<CityFound | CityNotFound>{
  try {
    const localization = await axios.get('http://api.openweathermap.org/geo/1.0/direct?', {
      params: {
        q: `${city},BR`,
        limit: 1,
        appid: process.env.API_KEY
      }
    })
    return {
      found: 'found',
      local: await localization.data[0]
    }
  }
  catch(err){
    return { found: 'notFound' }
  }
}

interface DataToUse{
  weather: {
    cod: number;
    weatherData: {
        current: Current;
        hourly: Hourly;
        daily: Daily;
    };
  };
  localization: {
    city: string;
    state: string;
  }
}

interface DataFailed{
  weather: { cod: number }
}

async function returnWeatherData(local: Local): Promise<DataToUse | DataFailed>{
  try {
    const data = await axios.get('https://api.openweathermap.org/data/2.5/onecall?', {
      params: {
        lat: local.lat,
        lon: local.lon,
        lang: 'pt_br',
        units: 'metric',
        exclude: 'minutely,alerts',
        appid: process.env.API_KEY
      }
    })
    const weatherData = splitWeatherDataType(await data.data as Data)
    return {
      weather: { cod: 200, weatherData },
      localization: { city: local.name, state: local.state }
    }
  }
  catch (error) {
    return {
      weather: { cod: 404 }
    }
  }
}

export { returnGeocodingLocalization, returnWeatherData }
export type { Local, CityFound, DataToUse, DataFailed }