// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

async function WeatherInf(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cityReq = req.query.city

  const APIdata = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityReq},BR&appid=${process.env.API_KEY}&lang=pt_br`)
  const APIdataJSON = await APIdata.json()

  const city = APIdataJSON.name
  const country = APIdataJSON.sys.country
  const temperature = Number(APIdataJSON.main.temp) - 273
  const description: string = APIdataJSON.weather[0].description

  res.status(200).json({
    city: city,
    country: country,
    temperature: temperature,
    description: description
  })
}

export default WeatherInf