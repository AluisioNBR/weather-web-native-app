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

  const temperature = parseInt(APIdataJSON.main.temp - 273)

  res.status(200).json({ city: APIdataJSON.name, country: APIdataJSON.sys.country, temperature: temperature, description: APIdataJSON.weather[0].description })
}

export default WeatherInf