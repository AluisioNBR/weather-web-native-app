import axios from 'axios'

export default async function returnInformations(req, res) {
  if(req.query.myApiSecret === process.env.MY_API_SECRET)
    res.status(200).json(await verifyInformations(req.query.city))
  else
    res.status(200).json({
      cod: 403,
      msg: "Você não tem autorização para fazer esta requisição!"
    })
}

async function verifyInformations(city){
  const data = await verifyCity(city)
  return verifyApiData(data)
}

async function verifyCity(city){
  const localization = await fecthAndReturnGeocodingLocalizationEndpointData(city)
  try {
    if(localization.found == 'notFound')
      throw new Error(`${localization.local.name} not found!`)
    
    return await fecthAndReturnWeatherData(localization.local)
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
  const ifNotFound = (data.weather.cod === 404) || (data.weather.cod === 400)
  return ifNotFound ? notFoundDataOfRequest(): foundDataOfRequest(data)
}

function foundDataOfRequest(data){
  return {
    cod: 200,
    city: `${data.localization.city}`,
    state: `${data.localization.state}`,
    current: formatCurrentWeather(data.weather.weatherData.current),
    hourly: formatHourWeather(data.weather.weatherData.hourly),
    daily: formatDayWeather(data.weather.weatherData.daily)
  }
}

function formatCurrentWeather(data){
  return {
    temp: formatTemperature(data.temp),
    feels_like: formatTemperature(data.feels_like),
    uvi: data.uvi,
    humidity: data.humidity,
    description: data.weather[0].description,
    icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    rain: ifRainy(data.weather[0].main, data.rain == undefined ? 0: data.rain['1h']),
    snow: ifSnowed(data.weather[0].main, data.snow == undefined ? 0: data.snow['1h'])
  }
}

function formatHourWeather(data){
  let weatherData, weatherHourly = [], currentHour = new Date().getHours()
  for(const dataForHour of data){
    weatherData = formatCurrentHourWeather(dataForHour, currentHour)
    currentHour = (currentHour + 1) === 24 ? 0 : currentHour + 1
    weatherHourly.push(weatherData)
  }
  return weatherHourly
}

function formatCurrentHourWeather(data, hour){
  return {
    hour: hour < 9 ? `${hour}:00`: `0${hour}:00`,
    temp: formatTemperature(data.temp),
    feels_like: formatTemperature(data.feels_like),
    uvi: data.uvi,
    humidity: data.humidity,
    description: data.weather[0].description,
    icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    pop: data.pop,
    rain: ifRainy(data.weather[0].main, data.rain == undefined ? 0: data.rain['1h']),
    snow: ifSnowed(data.weather[0].main, data.snow == undefined ? 0: data.snow['1h'])
  }
}

function formatDayWeather(data){
  let weatherData, weatherDaily = []
  for(const dataForDay of data){
    weatherData = formatCurrentDayWeather(dataForDay)
    weatherDaily.push(weatherData)
  }
  return weatherDaily
}

function formatCurrentDayWeather(data){
  return {
    moon_phase: formatMoonPhase(data.moon_phase),
    temp: {
      morn: formatTemperature(data.temp.morn),
      day: formatTemperature(data.temp.day),
      eve: formatTemperature(data.temp.eve),
      night: formatTemperature(data.temp.night),
      min: formatTemperature(data.temp.min),
      max: formatTemperature(data.temp.max)
    },
    feels_like: {
      morn: formatTemperature(data.feels_like.morn),
      day: formatTemperature(data.feels_like.day),
      eve: formatTemperature(data.feels_like.eve),
      night: formatTemperature(data.feels_like.night)
    },
    uvi: data.uvi,
    humidity: data.humidity,
    description: data.weather[0].description,
    icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    pop: data.pop,
    rain: ifRainy(data.weather[0].main, data.rain == undefined ? 0: data.rain),
    snow: ifSnowed(data.weather[0].main, data.snow == undefined ? 0: data.snow)
  }
}

function formatMoonPhase(id){
  if((id == 0) || (id == 1))
    return "lua nova"
  else if(id == 0.5)
    return "lua cheia"
  else if(id < 0.5)
    return "lua crescente"
  else
    return "lua minguante"
}

function formatTemperature(temp){
  let [intPartNumber, floatPartNumber] = `${temp}`.split('.'), numberToReturn = Number(intPartNumber)
  if(Number(floatPartNumber) >= 50)
    numberToReturn += 1
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
