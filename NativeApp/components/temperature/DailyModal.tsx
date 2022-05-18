import { useState } from 'react'
import { useFonts } from 'expo-font';
import { Pressable, View, Text, Modal, Image } from 'react-native'
import { CompostTemperatureDetails } from './CompostTemperatureDetails'
import { colors } from '../colors';

import type { DayWeather}	 from '../../App'

function selectTemp(instant) {
	if(instant == 'Manhã')
		return 'morn'
	else if(instant == 'Dia')
		return 'day'
	else if(instant == 'Tarde')
		return 'eve'
	else
		return 'night'
}

interface ModalInformationsProps{
	data: DayWeather;
	date: string
}

function ModalInformations({ data, date }: ModalInformationsProps){
	const [loaded] = useFonts({
	    'Poppins': require('../../assets/Poppins/Poppins-Regular.ttf'),
	})
	const [closeButtonColor, setCloseButtonColor] = useState(colors.black3)
	const temps = ['Manhã', 'Dia', 'Tarde', 'Noite'].map((instant) => {
		let temp = selectTemp(instant)
		return (
			<View key={instant} style={{ marginRight: 12, marginLeft: 12 }}>
				<Text style={{ color: colors.mainWhite, fontSize: 20, fontFamily: 'Poppins' }}>
					{instant}
				</Text>

				<Text style={{ color: colors.mainWhite, fontSize: 18, textAlign: 'center', fontFamily: 'Poppins' }}>
					{data.temp[`${temp}`]}°C
				</Text>

				<Text style={{ color: colors.gray1, fontSize: 16, textAlign: 'center', fontFamily: 'Poppins' }}>
					{data.feels_like[`${temp}`]}°C
				</Text>				
			</View>
		)
	})
	return(
		<View>
			<Text style={{ color: colors.mainWhite, fontSize: 22, textAlign: 'center', fontFamily: 'Poppins' }}>
				{date}
			</Text>

			<View style={{ margin: 2, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
				<Image
					source={{
						uri: data.icon
					}}
					style={{ width: 32, height: 32 }}
				/>

				<Text style={{ color: colors.mainWhite, fontSize: 22, textAlign: 'center', fontFamily: 'Poppins' }}>
					{data.description}
				</Text>
			</View>

			<View style={{ margin: 2 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<Text style={{ color: colors.mainWhite, fontSize: 20, textAlign: 'center', fontFamily: 'Poppins' }}>
						Máxima: {data.temp.max}°C
					</Text>

					<Text style={{ color: colors.mainWhite, fontSize: 20, textAlign: 'center', fontFamily: 'Poppins' }}>
						Mínima: {data.temp.min}°C
					</Text>
				</View>

				<View style={{ flexDirection: 'row' }}>
					{temps}
				</View>
			</View>

			<CompostTemperatureDetails
				data={data}
			/>
		</View>
	)
}

interface DailyModalProps{
	data: DayWeather;
	date: string;
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function DailyModal({ data, date, visible, setVisible }: DailyModalProps) {
	const [loaded] = useFonts({
	    'Poppins': require('../../assets/Poppins/Poppins-Regular.ttf'),
	})
	const [closeButtonColor, setCloseButtonColor] = useState(colors.black4)
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
						
						width: 360,
						height: 360,
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 8,
						paddingBottom: 8,
						
						alignItems: 'center'
					}}
				>
					<ModalInformations data={data} date={date}/>

					<Pressable
						onPress={() => setVisible(false)}
						onPressIn={() => setCloseButtonColor(colors.black4)}
						onPressOut={() => setCloseButtonColor(colors.black3)}
					>
						<View style={{
							backgroundColor: closeButtonColor,
							padding: 4,
							borderRadius: 50,
							width: 100,
							alignItems: 'center',
							justifyContent: 'center'
						}}>
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

export { DailyModal }