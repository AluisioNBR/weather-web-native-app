import { useState } from 'react'
import { useFonts } from 'expo-font';
import { Pressable, View, Text, Modal } from 'react-native'
import { MainTemperature } from './mainTemperature'
import { CompostTemperatureDetails } from './compostTemperatureDetails'

function HourlyModal({ data, visible, setVisible }){
	const [loaded] = useFonts({
	   'Poppins': require('../../assets/Poppins/Poppins-Regular.ttf'),
	})
	const [closeButtonColor, setCloseButtonColor] = useState('#777')
	return(
		<Modal
			animationType='fade'
			transparent={true}
			visible={visible}
			onRequestClose={() => setVisible(false)}
		>
			<View
				style={{
					backgroundColor: '#00000055',
					
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<View
					style={{
						backgroundColor: '#333',
						borderRadius: 50,
						
						width: 385,
						height: 385,
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 8,
						paddingBottom: 8,
						
						alignItems: 'center'
					}}
				>
					<Text style={{ fontSize: 30, color: '#fdfdfd', fontFamily: 'Poppins' }}>
						{data.hour}
					</Text>

					<MainTemperature
						icon={data.icon}
  						temperature={data.temp}
  						feels_like={data.feels_like}
						description={data.description}
					/>
				
					<CompostTemperatureDetails
						data={data}
					/>
			
					<Pressable
						onPress={() => setVisible(false)}
						onPressIn={() => setCloseButtonColor('#999')}
					  onPressOut={() => setCloseButtonColor('#777')}
					>
						<View style={{ backgroundColor: closeButtonColor, padding: 4, borderRadius: 50, width: 100 }}>
							<Text style={{ color: '#fdfdfd', fontSize: 20, textAlign: 'center', fontFamily: 'Poppins' }}>
								Fechar
							</Text>
						</View>
					</Pressable>
				</View>
			</View>
		</Modal>
	)
}

export { HourlyModal }