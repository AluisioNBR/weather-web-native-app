import { TemperatureDetails } from './TemperatureDetails'
import { View, Text } from 'react-native'
import { useFonts } from 'expo-font';
import { colors } from '../colors';

import type { NoRain, AmountOfRain, NoSnow, AmountOfSnow } from '../../App'

interface CompostTemperatureDetailsProps{ data: {
  humidity: number;
  uvi: number;
  pop: number;
  rain: NoRain | AmountOfRain;
  snow: NoSnow | AmountOfSnow
} }

function CompostTemperatureDetails({ data }: CompostTemperatureDetailsProps){
	const [loaded] = useFonts({
    'Poppins': require('../../assets/Poppins/Poppins-Regular.ttf'),
  })
	return(
		<View>
			<TemperatureDetails
				humidity={data.humidity}
        uvi={data.uvi}
        rain={data.rain}
        snow={data.snow}
			/>
			
			<View style={{ alignItems: 'center' }}>
        <Text style={{
          fontSize: 14,
          color: colors.gray1,
          margin: 8,
      		fontFamily: 'Poppins'
        }}>
          Precipitação: {`${data.pop}%`}
        </Text>
			</View>
		</View>
	)
}

export { CompostTemperatureDetails }