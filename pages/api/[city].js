import axios from 'axios'

async function fecthAndReturnApiData(city){
  try {
    const data = await axios.get('https://api.openweathermap.org/data/2.5/weather?', {
      params: {
        q: `${city},BR`,
        lang: 'pt_br',
        units: 'metric',
        appid: process.env.API_KEY
      }
    })
    return await data.data;
  } catch (error) {
    return {
      cod: 404
    }
  }
}

function goodRequestData(data){
  return {
    cod: data.cod,
    city: `${data.name}`,
    temperature: Math.floor(data.main.temp) + 1,
    main: {
      feels_like: Math.floor(data.main.feels_like) + 1,
      temp_min: Math.floor(data.main.temp_min) + 1,
      temp_max: Math.floor(data.main.temp_max) + 1,
      humidity: Math.floor(data.main.humidity) + 1,
    },
    icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    description: data.weather[0].description
  }
}

function notFoundDataOfRequest(){
  return {
    cod: 404,
    msg: "Cidade não encontrada! Tente outra cidade!"
  }
}

function verifyApiData(data){
  if (data.cod === 200) return goodRequestData(data)
  else return notFoundDataOfRequest()
}

async function returnWeatherInformations(req, res) {
  const data = await fecthAndReturnApiData(req.query.city)
  const responseForUser = verifyApiData(data)
  res.status(200).json(responseForUser)
}

export default returnWeatherInformations;
