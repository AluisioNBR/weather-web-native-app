import { formatMoonPhase, formatTemperature, ifRainy, ifSnowed } from './formatGenericalData'
import type { Current, Hour, Hourly, Day, Daily, NoRain, NoSnow, Rain, Snow } from './formatGenericalData'

interface FormatCurrentWeather{
  temp: number;
  feels_like: number;
  uvi: number;
  humidity: number;
  description: string;
  icon: string;
  rain: NoRain | Rain;
  snow: NoSnow | Snow;
}

function formatCurrentWeather(data: Current): FormatCurrentWeather{
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

function formatHourWeather(data: Hourly){
  let weatherData, weatherHourly = []
  const completeHour = new Date().toUTCString().split(' ')[4]
  let currentHour = Number(completeHour.split(':')[0]) - 3 
  for(const dataForHour of data){
    weatherData = formatCurrentHourWeather(dataForHour, currentHour)
    currentHour = (currentHour + 1) === 24 ? 0 : currentHour + 1
    weatherHourly.push(weatherData)
  }
  return weatherHourly
}

interface FormatCurrentHourWeather{
  hour: string;
  temp: number;
  feels_like: number;
  uvi: number;
  humidity: number;
  description: string;
  icon: string;
  pop: number;
  rain: NoRain | Rain;
  snow: NoSnow | Snow
}

function formatCurrentHourWeather(data: Hour, hour: number): FormatCurrentHourWeather{
  return {
    hour: hour > 9 ? `${hour}:00`: `0${hour}:00`,
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

function formatDayWeather(data: Daily){
  let weatherData, weatherDaily = []
  for(const dataForDay of data){
    weatherData = formatCurrentDayWeather(dataForDay)
    weatherDaily.push(weatherData)
  }
  return weatherDaily
}

interface FormatCurrentDayWeather{
  moon_phase: string;
  temp: {
      morn: number;
      day: number;
      eve: number;
      night: number;
      min: number;
      max: number;
  };
  feels_like: {
      morn: number;
      day: number;
      eve: number;
      night: number;
  };
  uvi: number;
  humidity: number;
  description: string;
  icon: string;
  pop: number;
  rain: NoRain | Rain;
  snow: NoSnow | Snow;
}

function formatCurrentDayWeather(data: Day): FormatCurrentDayWeather{
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

export { formatCurrentWeather, formatHourWeather, formatDayWeather }
export type { FormatCurrentWeather, FormatCurrentHourWeather, FormatCurrentDayWeather }