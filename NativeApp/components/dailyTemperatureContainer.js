import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { DailyTemperature } from './temperature/dailyTemperature'

function DailyTemperaturesContainer({ dailyTemperatures }){
  let currentKey = 100
  const newDate = new Date().toLocaleString().split(' ')

  const currentDate = []
  newDate.forEach((item) => {
    if(item != "" && item != "00:00:00")
      currentDate.push(item)
  })

  let baseNumberDay = Number(currentDate[2])
  const baseNumberMonth = (new Date().getMonth()) + 1

  const temperatures = dailyTemperatures.map((day) => {
    const date = new Date(currentDate[4], (baseNumberMonth - 1), baseNumberDay)

    const dataActualDate = []
    date.toLocaleString().split(' ').forEach((item) => {
      if(item != "" && item != "00:00:00")
        dataActualDate.push(item)
    })

    const numberDay = Number(dataActualDate[2]) < 10 ? `0${dataActualDate[2]}`: dataActualDate[2]
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}`: date.getMonth() + 1
    const dateToReturn = `${numberDay}/${month}/${dataActualDate[3]}`

    baseNumberDay += 1
    currentKey += 1
    
    return <DailyTemperature key={currentKey} day={day} date={dateToReturn}/>
  })
  return (
      <ScrollView style={{ flex: 1 }}>
        {temperatures}
      </ScrollView>
  )
}

export { DailyTemperaturesContainer }