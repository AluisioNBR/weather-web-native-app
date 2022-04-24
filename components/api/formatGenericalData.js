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

function splitWeatherDataType(data){
  return {
    current: data.current,
    hourly: data.hourly,
    daily: data.daily
  }
}

function formatDays(dateReq) {
  dateReq = dateReq.split('/')
  const days = [], month = (Number(dateReq[1]) - 1), year = Number(dateReq[2])
  let day = Number(dateReq[0])
  for(let cont = 0; cont < 8; cont++){
    const date = new Date(year, month, day)
    days.push(date)
    day += 1
  }
  return days
}

export { formatMoonPhase, formatTemperature, ifRainy, ifSnowed, splitWeatherDataType, formatDays }