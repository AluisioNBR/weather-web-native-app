import { useState } from 'react'
import { useFonts } from 'expo-font';
import { Pressable, View, Text, Modal, Image } from 'react-native'
import { CompostTemperatureDetails } from './compostTemperatureDetails'

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

function ModalInformations({ data, visible, setVisible, date }){
	const [loaded] = useFonts({
	    'Poppins': require('../../assets/Poppins/Poppins-Regular.ttf'),
	})
	const [closeButtonColor, setCloseButtonColor] = useState('#666')
	const temps = ['Manhã', 'Dia', 'Tarde', 'Noite'].map((instant) => {
		let temp = selectTemp(instant)
		return (
			<View style={{ marginRight: 12, marginLeft: 12 }}>
				<Text style={{ color: '#fdfdfd', fontSize: 20, fontFamily: 'Poppins' }}>
					{instant}
				</Text>

				<Text style={{ color: '#fdfdfd', fontSize: 18, textAlign: 'center', fontFamily: 'Poppins' }}>
					{data.temp[`${temp}`]}°C
				</Text>

				<Text style={{ color: '#ccc', fontSize: 16, textAlign: 'center', fontFamily: 'Poppins' }}>
					{data.feels_like[`${temp}`]}°C
				</Text>				
			</View>
		)
	})
	return(
		<View>
			<Text style={{ color: '#fdfdfd', fontSize: 22, textAlign: 'center', fontFamily: 'Poppins' }}>
				{date}
			</Text>

			<View style={{ margin: 2, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
				<Image
					source={{
						uri: data.icon
					}}
					style={{ width: 32, height: 32 }}
				/>

				<Text style={{ color: '#fdfdfd', fontSize: 22, textAlign: 'center', fontFamily: 'Poppins' }}>
					{data.description}
				</Text>
			</View>

			<View style={{ margin: 2 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<Text style={{ color: '#fdfdfd', fontSize: 20, textAlign: 'center', fontFamily: 'Poppins' }}>
						Máxima: {data.temp.max}°C
					</Text>

					<Text style={{ color: '#fdfdfd', fontSize: 20, textAlign: 'center', fontFamily: 'Poppins' }}>
						Mínima: {data.temp.min}°C
					</Text>
				</View>

				<View style={{ flexDirection: 'row', textAlign: 'center' }}>
					{temps}
				</View>
			</View>

			<CompostTemperatureDetails
				data={data}
			/>
		</View>
	)
}

function DailyModal({ data, date, visible, setVisible }) {
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
						onPressIn={() => setCloseButtonColor('#777')}
						onPressOut={() => setCloseButtonColor('#666')}
					>
						<View style={{
							backgroundColor: closeButtonColor,
							padding: 4,
							borderRadius: 50,
							width: 100,
							alignItems: 'center',
							justifyContent: 'center'
						}}>
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

export { DailyModal }