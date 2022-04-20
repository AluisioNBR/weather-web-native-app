import { Pressable, View, Text, Image } from 'react-native'
import { useState } from 'react'
import { useFonts } from 'expo-font';
import { HourlyModal } from './hourlyModal'

function HourlyTemperature({hour}){
	const [loaded] = useFonts({
	    'Poppins': require('../../assets/Poppins/Poppins-Regular.ttf'),
	  })
	const [modalVisible, setModalVisible] = useState(false)
	const [backgroundColor, setBackgroundColor] = useState('#555')
	return (
		<View>
			<HourlyModal
				data={hour}
				visible={modalVisible}
				setVisible={setModalVisible}
			/>

			<Pressable
				onPress={() => setModalVisible(true)}
				onPressIn={() => setBackgroundColor('#777')}
				onPressOut={() => setBackgroundColor('#555')}
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
					<Text style={{ color: '#fdfdfd', fontSize: 20, fontFamily: 'Poppins' }}>
							{hour.hour}
					</Text>
					
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Image
							source={{ uri: hour.icon }}
							style={{ width: 32, height: 32}}
						/>

						<Text style={{ color: '#fdfdfd', fontSize: 32, fontFamily: 'Poppins' }}>
								{hour.temp}°C
						</Text>
					</View>
					
					<Text style={{ color: '#bbb', fontFamily: 'Poppins', textAlign: 'center' }}>
							Sensação Térmica: {hour.feels_like}°C
					</Text>
				</View>
			</Pressable>
		</View>
	)
}

export { HourlyTemperature }