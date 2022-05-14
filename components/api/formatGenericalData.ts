function formatMoonPhase(id: number){
  if((id == 0) || (id == 1))
    return "lua nova"
  else if(id == 0.5)
    return "lua cheia"
  else if(id < 0.5)
    return "lua crescente"
  else
    return "lua minguante"
}

function formatTemperature(temp: number){
  let [intPartNumber, floatPartNumber] = `${temp}`.split('.'), numberToReturn = Number(intPartNumber)
  if(Number(floatPartNumber) >= 50)
    numberToReturn += 1
  return numberToReturn
}

function ifRainy(main: string, rain: number){
  return main === "Rain" ? {
    rainy: 'rain',
    rain: rain
  }: { rainy: 'no-rain' }
}

function ifSnowed(main: string, snow: number){
  return main === "Snow" ? {
    snowed: 'snow',
    snow: snow
  }: { snowed: 'no-snow' }
}

interface Weather{
  "id": number,
  "main": string,
  "description": string,
  "icon": string
}

interface Current{
  "dt": number,
  "sunrise": number,
  "sunset": number,
  temp: number,
  feels_like: number,
  "pressure": number,
  humidity: number,
  "dew_point": number,
  uvi: number,
  "clouds": number,
  "visibility": number,
  "wind_speed": number,
  "wind_deg": number,
  "wind_gust": number,
  weather: Weather[],
  rain?: {
    "1h": number
  },
  snow?: {
    "1h": number
  }
}

interface Hour{
  "dt": number,
  "sunrise": number,
  "sunset": number,
  temp: number,
  feels_like: number,
  "pressure": number,
  humidity: number,
  "dew_point": number,
  uvi: number,
  "clouds": number,
  "visibility": number,
  "wind_speed": number,
  "wind_deg": number,
  "wind_gust": number,
  weather: Weather[]
  pop: number
  rain?: {
    "1h": number
  },
  snow?: {
    "1h": number
  }
}

type Hourly = Hour[]

interface Day{
  "dt": number,
  "sunrise": number,
  "sunset": number,
  "moonrise": number,
  "moonset": number,
  moon_phase: number,
  temp: {
    day: number,
    min: number,
    max: number,
    night: number,
    eve: number,
    morn: number
  },
  feels_like: {
    day: number,
    night: number,
    eve: number,
    morn: number
  },
  "pressure": number,
  humidity: number,
  "dew_point": number,
  "wind_speed": number,
  "wind_deg": number,
  "wind_gust": number,
  weather: Weather[],
  "clouds": number,
  pop: number,
  rain?: number,
  snow?: number,
  uvi: number
}

type Daily = Day[]

interface Data{
  "lat": number,
  "lon": number,
  "timezone": string,
  "timezone_offset": number,
  current: Current,
  hourly: Hourly,
  daily: Daily
}

function splitWeatherDataType(data: Data){
  return {
    current: data.current,
    hourly: data.hourly,
    daily: data.daily
  }
}

export type { Data, Current, Hour, Hourly, Day, Daily }
export { formatMoonPhase, formatTemperature, ifRainy, ifSnowed, splitWeatherDataType }