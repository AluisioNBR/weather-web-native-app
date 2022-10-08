import { HourlyTemperature } from './temperature/HourlyTemperature'

import type { HourWeather } from '../pages/index'

interface HourlyTemperaturesProps{
  hourlyTemperatures: any[] | HourWeather[]
}

function HourlyTemperaturesContainer({ hourlyTemperatures }: HourlyTemperaturesProps){
  let numberKey = 0
  const temperatures = hourlyTemperatures.map((hour: HourWeather) => {
    numberKey += 1
    return <HourlyTemperature key={`${hour.hour}=${numberKey}`} hour={hour}/>
  })
  return (
    <div style={{ display: 'flex', alignItems: 'center', overflow: 'auto' }}>
      {temperatures}
    </div>
  )
}

export { HourlyTemperaturesContainer }