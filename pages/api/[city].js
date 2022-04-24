import {
  formatCurrentWeather,
  formatHourWeather,
  formatDayWeather
} from './../../components/api/dataFormatation'
import { returnGeocodingLocalization, returnWeatherData } from './../../components/api/dataReqs'

export default async function returnData(req, res) {
  if(req.query.myApiSecret === process.env.MY_API_SECRET)
    res.status(200).json(await verifyInformations(req.query.city, req.query.date))
  else
    res.status(200).json({
      cod: 403,
      msg: "Você não tem autorização para fazer esta requisição!"
    })
}

async function verifyInformations(city, date){
  const data = await verifyCity(city)
  return verifyApiData(data, date)
}

async function verifyCity(city){
  const localization = await returnGeocodingLocalization(city)
  try {
    if(localization.found == 'notFound')
      throw new Error(`${localization.local.name} not found!`)
    
    return await returnWeatherData(localization.local)
  }
  catch (error) {
    return { weather: { cod: 404 } }
  }
}

function verifyApiData(data, date){
  const ifNotFound = (data.weather.cod === 404) || (data.weather.cod === 400)
  return ifNotFound ? notFoundDataOfRequest(): foundDataOfRequest(data, date)
}

function foundDataOfRequest(data, date){
  return {
    cod: 200,
    city: `${data.localization.city}`,
    state: `${data.localization.state}`,
    current: formatCurrentWeather(data.weather.weatherData.current),
    hourly: formatHourWeather(data.weather.weatherData.hourly),
    daily: formatDayWeather(data.weather.weatherData.daily, date)
  }
}

function notFoundDataOfRequest(){
  return {
    cod: 404,
    msg: "Cidade não encontrada! Tente outra cidade!"
  }
}
