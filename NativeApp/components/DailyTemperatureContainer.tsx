import { ScrollView } from 'react-native'
import { DailyTemperature } from './temperature/DailyTemperature'

import type { DayWeather } from '../App'

interface DailyTemperaturesProps{
  dailyTemperatures: any[] | DayWeather[]
}

function DailyTemperaturesContainer({ dailyTemperatures }: DailyTemperaturesProps){
  let [baseYear, baseNumberMonth, baseNumberDay]: number[] = getCurrentDate()

  const temperatures = dailyTemperatures.map((day: DayWeather) => {
    const dateToReturn = returnDate(baseYear, (baseNumberMonth - 1), baseNumberDay)
    baseNumberDay += 1
    
    return <DailyTemperature key={dateToReturn} day={day} date={dateToReturn}/>
  })
  return (
      <ScrollView style={{ flex: 1 }}>
        {temperatures}
      </ScrollView>
  )
}

function getCurrentDate() {
  const currentDate = []
  
  new Date().toLocaleString().split(' ').forEach((item) => {
    if(item != "" && item != "00:00:00")
      currentDate.push(item)
  })

  return [currentDate[4], (new Date().getMonth()) + 1, Number(currentDate[2])]
}

function returnDate(baseYear: number, baseMonth: number, day: number) {
  const date = new Date(baseYear, baseMonth, day)

  const dataActualDate = []
  date.toLocaleString().split(' ').forEach((item) => {
    if(item != "" && item != "00:00:00")
      dataActualDate.push(item)
  })

  const numberDay = Number(dataActualDate[2]) < 10 ? `0${dataActualDate[2]}`: dataActualDate[2]
  const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}`: date.getMonth() + 1
  return `${translateDayName(dataActualDate[0])}, ${numberDay}/${month}/${dataActualDate[3]}`
}

function translateDayName(dayName: string) {
  const dayNames = {
    "Sun": "Domingo",
    "Mon": "Segunda",
    "Tue": "Terça",
    "Wed": "Quarta",
    "Thu": "Quinta",
    "Fri": "Sexta",
    "Sat": "Sábado"
  }
  return dayNames[dayName]
}

export { DailyTemperaturesContainer }