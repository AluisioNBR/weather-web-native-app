// import { HourlyModal } from './HourlyModal'
import { useState } from 'react'
import { AppColors } from '../../styles/AppColors'
import type { HourlyTemperatureProps } from '../../types/temperature/HourlyTemperature.types'

export function HourlyTemperature({ children }: HourlyTemperatureProps){
	const [modalVisible, setModalVisible] = useState(false)
	const [backgroundColor, setBackgroundColor] = useState(AppColors.Black1)
	return (
		<button 
			onClick={() => setModalVisible(true)}
			style={{
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
			<p style={{ color: '#fdfdfd', fontSize: 20 }}>
				{children.hour}
			</p>
		</button>
	)
}