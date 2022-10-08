import { formatMoonPhase, formatTemperature, ifRainy, ifSnowed, formatDays } from './formatGenericalData'

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
  let weatherData, weatherHourly = []
  const completeHour = new Date().toGMTString().split(' ')[4]
  let currentHour = Number(completeHour.split(':')[0]) - 3 
  for(const dataForHour of data){
    weatherData = formatCurrentHourWeather(dataForHour, currentHour)
    currentHour = (currentHour + 1) === 24 ? 0 : currentHour + 1
    weatherHourly.push(weatherData)
  }
  return weatherHourly
}

function formatCurrentHourWeather(data, hour){
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

function formatDayWeather(data, date){
  let weatherData, weatherDaily = [], dayIndex = 0
  const days = formatDays(date)
  for(const dataForDay of data){
    weatherData = formatCurrentDayWeather(dataForDay, days[dayIndex])
    dayIndex += 1
    weatherDaily.push(weatherData)
  }
  return weatherDaily
}

function formatCurrentDayWeather(data, day){
  return {
    day: day,
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