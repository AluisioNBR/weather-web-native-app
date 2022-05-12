import { ScrollView } from 'react-native'
import { HourlyTemperature } from './temperature/hourlyTemperature'

function HourlyTemperaturesContainer({ hourlyTemperatures }){
    let numberKey = 0
    const temperatures = hourlyTemperatures.map((hour) => {
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