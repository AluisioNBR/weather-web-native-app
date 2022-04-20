import { ScrollView } from 'react-native'
import { DailyTemperature } from './temperature/dailyTemperature'

function DailyTemperaturesContainer({ dailyTemperatures }){
  let currentKey = 0
  const gmtDate = new Date().toGMTString().split(' ')
  let dateDay = Number(gmtDate[1])

  const temperatures = dailyTemperatures.map((day) => {
      const date = `${dateDay} ${gmtDate[2]} de ${gmtDate[3]}`
      dateDay += 1
      currentKey += 1
      return <DailyTemperature key={currentKey} day={day} date={date}/>
  })
  return (
      <ScrollView style={{ flex: 1 }}>
        {temperatures}
      </ScrollView>
  )
}

export { DailyTemperaturesContainer }