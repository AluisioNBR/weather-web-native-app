// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

async function WeatherInf(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const city = req.query.city
  const country = 'BR'
  let temperature = 30
  let weatherDescription = 'Teste'
  res.status(200).json({ city: city, country: country, temperature: temperature, description: weatherDescription })
}

export default WeatherInf