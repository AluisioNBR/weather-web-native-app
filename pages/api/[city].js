import axios from 'axios'

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
      cod: 200,
      local: local[0]
    }
  }
  catch(err){
    return {
      cod: 404
    }
  }
}

async function fecthAndReturnCurrentWeatherEndpointData(city){
  const localization = await fecthAndReturnGeocodingLocalizationEndpointData(city)
  try {
    if(localization.cod === 404) throw new Error('City not found!')
    else {
      const data = await axios.get('https://api.openweathermap.org/data/2.5/weather?', {
        params: {
          lat: localization.local.lat,
          lon: localization.local.lon,
          lang: 'pt_br',
          units: 'metric',
          appid: process.env.API_KEY
        }
      })
      const weatherData = await data.data
      return {
        weather: weatherData,
        localization: {
          city: localization.local.name,
          state: localization.local.state
        }
      };
    }
  } catch (error) {
    return {
      weather: { cod: 404 }
    }
  }
}

function goodRequestData(data){
  return {
    cod: data.weather.cod,
    city: `${data.localization.city}`,
    country: `${data.localization.state}`,
    temperature: Math.floor(data.weather.main.temp) + 1,
    main: {
      feels_like: Math.floor(data.weather.main.feels_like) + 1,
      temp_min: Math.floor(data.weather.main.temp_min) + 1,
      temp_max: Math.floor(data.weather.main.temp_max) + 1,
      humidity: Math.floor(data.weather.main.humidity) + 1,
    },
    icon: `http://openweathermap.org/img/w/${data.weather.weather[0].icon}.png`,
    description: data.weather.weather[0].description
  }
}

function notFoundDataOfRequest(){
  return {
    cod: 404,
    msg: "Cidade não encontrada! Tente outra cidade!"
  }
}

function verifyApiData(data){
  if (data.weather.cod === 200) return goodRequestData(data)
  else return notFoundDataOfRequest()
}

async function returnWeatherInformations(req, res) {
  const data = await fecthAndReturnCurrentWeatherEndpointData(req.query.city)
  const responseForUser = verifyApiData(data)
  res.status(200).json(responseForUser)
}

export default returnWeatherInformations;
