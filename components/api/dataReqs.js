import axios from 'axios'
import { splitWeatherDataType } from './formatGenericalData'

async function returnGeocodingLocalization(city){
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
    return {
      found: 'notFound',
      local: { name: 'null', lat: 0, lon: 0, country: 'null', state: 'null' }
    }
  }
}

async function returnWeatherData(local){
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
    const weatherData = splitWeatherDataType(await data.data)
    return {
      weather: { cod: 200, weatherData },
      localization: { city: local.name, state: local.state }
    }
  }
  catch (error) {
    return {
      weather: { cod: 404 },
      localization: { city: 'null', state: 'null' }
    }
  }
}

export { returnGeocodingLocalization, returnWeatherData }