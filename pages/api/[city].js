import axios from 'axios'

export default async function returnInformations(req, res) {
  if(req.query.myApiSecret === process.env.MY_API_SECRET){
    const data = await verifyCity(req.query.city)
    const responseForUser = verifyApiData(data)
    res.status(200).json(responseForUser)
  }
  else res.status(200).json({
    cod: 403,
    msg: "Você não tem autorização para fazer esta requisição!"
  })
}

async function verifyCity(city){
  const localization = await fecthAndReturnGeocodingLocalizationEndpointData(city)
  try {
    if(localization.found == 'notFound') throw new Error(`${localization.local.name} not found!`)
    const weatherData = fecthAndReturnWeatherData(localization.local)
    return weatherData
  }
  catch (error) {
    return {
      weather: { cod: 404 }
    }
  }
}

async function fecthAndReturnGeocodingLocalizationEndpointData(city){
  try {
    const localization = await axios.get('http://api.openweathermap.org/geo/1.0/direct?', {
      params: {
        q: `${city},BR`,
        limit: 1,
        appid: process.env.API_KEY
      }
    })
    const local = await localization.data
    return {
      found: 'found',
      local: local[0]
    }
  }
  catch(err){
    return {
      found: 'notFound',
      local: { name: 'null', lat: 0, lon: 0, country: 'null', state: 'null' }
    }
  }
}

async function fecthAndReturnWeatherData(local){
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
      weather: {
        cod: 200,
        weatherData
      },
      localization: {
        city: local.name,
        state: local.state
      }
    }
  }
  catch (error) {
    return {
      weather: {
        cod: 404,
        current: null,
        hourly: null,
        daily: null
      },
      localization: {
        city: 'null',
        state: 'null'
      }
    }
  }
}

function splitWeatherDataType(data){
  return {
    current: data.current,
    hourly: data.hourly,
    daily: data.daily
  }
}

function verifyApiData(data){
  return (data.weather.cod === 404) || (data.weather.cod === 400) ? notFoundDataOfRequest(): foundDataOfRequest(data)
}

/*
* data.weather.current
* data.weather.hourly
* data.weather.daily
*/

// TODO Add os valores reais da nova API
function foundDataOfRequest(data){
  const currentWeatherData = formatCurrentWeather(data.weather.weatherData.current)
  return {
    cod: 200,
    city: `${data.localization.city}`,
    state: `${data.localization.state}`,
    current: currentWeatherData
  }
}

function formatCurrentWeather(data){
  return {
    temp: formatTemperature(data.temp),
    feels_like: formatTemperature(data.feels_like),
    uvi: data.uvi,
    description: data.weather[0].description,
    icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    rain: ifRainy(data.weather[0].main, data.rain == undefined ? 0: data.rain['1h']),
    snow: ifSnowed(data.weather[0].main, data.snow == undefined ? 0: data.snow['1h'])
  }
}

function formatTemperature(temp){
  let [intPartNumber, floatPartNumber] = `${temp}`.split('.'), numberToReturn = Number(intPartNumber)
  if(Number(floatPartNumber) >= 50) numberToReturn += 1
  return numberToReturn
}

function ifRainy(main, rain){
  return main === "Rain" ? {
    rainy: 'rain',
    rain: rain
  }: { rainy: 'no-rain' }
}

function ifSnowed(main, snow){
  return main === "Snow" ? {
    snowed: 'snow',
    snow: snow
  }: { snowed: 'no-snow' }
}

function notFoundDataOfRequest(){
  return {
    cod: 404,
    msg: "Cidade não encontrada! Tente outra cidade!"
  }
}
