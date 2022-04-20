import { ScrollView } from 'react-native'
import { HourlyTemperature } from './temperature/hourlyTemperature'

function HourlyTemperaturesContainer({ hourlyTemperatures }){
    let currentKey = 0
    const temperatures = hourlyTemperatures.map((hour) => {
        currentKey += 1
        return <HourlyTemperature key={currentKey} hour={hour}/>
    })
    return (
        <ScrollView style={{ flex: 1 }} horizontal={true}>
            {temperatures}
        </ScrollView>
    )
}

export { HourlyTemperaturesContainer }