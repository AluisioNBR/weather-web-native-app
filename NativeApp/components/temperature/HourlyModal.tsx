import { useState } from 'react'
import { useFonts } from 'expo-font';
import { Pressable, View, Text, Modal } from 'react-native'
import { MainTemperature } from './MainTemperature'
import { CompostTemperatureDetails } from './CompostTemperatureDetails'
import { colors } from '../colors';

import type { HourWeather}	 from '../../App'

interface HourlyModalProps{
	data: HourWeather;
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function HourlyModal({ data, visible, setVisible }: HourlyModalProps){
	const [loaded] = useFonts({
	   'Poppins': require('../../assets/Poppins/Poppins-Regular.ttf'),
	})
	const [closeButtonColor, setCloseButtonColor] = useState(colors.black2)
	return(
		<Modal
			animationType='fade'
			transparent={true}
			visible={visible}
			onRequestClose={() => setVisible(false)}
		>
			<View
				style={{
					backgroundColor: colors.blackOpacity,
					
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<View
					style={{
						backgroundColor: colors.mainBlack,
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
					<Text style={{ fontSize: 30, color: colors.mainWhite, fontFamily: 'Poppins' }}>
						{data.hour}
					</Text>

					<MainTemperature
						icon={data.icon}
						temperature={String(data.temp)}
						feels_like={String(data.feels_like)}
						description={data.description}
					/>
				
					<CompostTemperatureDetails
						data={data}
					/>
			
					<Pressable
						onPress={() => setVisible(false)}
						onPressIn={() => setCloseButtonColor(colors.black4)}
					  onPressOut={() => setCloseButtonColor(colors.black3)}
					>
						<View style={{ backgroundColor: closeButtonColor, padding: 4, borderRadius: 50, width: 100 }}>
							<Text style={{ color: colors.mainWhite, fontSize: 20, textAlign: 'center', fontFamily: 'Poppins' }}>
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