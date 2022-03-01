async function WeatherInf(req, res) {
  const cityReq = req.query.city

  const APIdata = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityReq},BR&appid=${process.env.API_KEY}&lang=pt_br`)
  const APIdataJSON = await APIdata.json()

  const city = `${APIdataJSON.name}`
  const temperature = parseInt(Number(APIdataJSON.main.temp) - 273) + 1
  const description: string = APIdataJSON.weather[0].description

  res.status(200).json({
    city: city,
    country: 'BR',
    temperature: temperature,
    description: description
  })
}

export default WeatherInf