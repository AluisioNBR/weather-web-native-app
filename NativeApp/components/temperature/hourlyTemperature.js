import { Pressable, View, Text, Image } from 'react-native'
import { useState } from 'react'
import { useFonts } from 'expo-font';
import { HourlyModal } from './hourlyModal'
import { colors } from '../colors';

function HourlyTemperature({hour}){
	const [loaded] = useFonts({
	    'Poppins': require('../../assets/Poppins/Poppins-Regular.ttf'),
	  })
	const [modalVisible, setModalVisible] = useState(false)
	const [backgroundColor, setBackgroundColor] = useState(colors.black2)
	return (
		<View>
			<HourlyModal
				data={hour}
				visible={modalVisible}
				setVisible={setModalVisible}
			/>

			<Pressable
				onPress={() => setModalVisible(true)}
				onPressIn={() => setBackgroundColor(colors.black4)}
				onPressOut={() => setBackgroundColor(colors.black2)}
			>
				<View style={{
					backgroundColor: backgroundColor,            	
					alignItems: 'center',
					justifyContent: 'space-evenly',
					
					marginRight: 8,
					marginLeft: 8,
					padding: 12,
					borderRadius: 40,
					
					width: 165,
					height: 165
				}}>
					<Text style={{ color: colors.mainWhite, fontSize: 20, fontFamily: 'Poppins' }}>
							{hour.hour}
					</Text>
					
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Image
							source={{ uri: hour.icon }}
							style={{ width: 32, height: 32}}
						/>

						<Text style={{ color: colors.mainWhite, fontSize: 32, fontFamily: 'Poppins' }}>
								{hour.temp}°C
						</Text>
					</View>
					
					<Text style={{ color: colors.gray1, fontFamily: 'Poppins', textAlign: 'center' }}>
							Sensação Térmica: {hour.feels_like}°C
					</Text>
				</View>
			</Pressable>
		</View>
	)
}

export { HourlyTemperature }