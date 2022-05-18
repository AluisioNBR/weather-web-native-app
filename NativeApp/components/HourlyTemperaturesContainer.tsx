import { ScrollView } from 'react-native'
import { HourlyTemperature } from './temperature/HourlyTemperature'

import type { HourWeather } from '../App'

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
    <ScrollView style={{ flex: 1 }} horizontal={true}>
      {temperatures}
    </ScrollView>
  )
}

export { HourlyTemperaturesContainer }