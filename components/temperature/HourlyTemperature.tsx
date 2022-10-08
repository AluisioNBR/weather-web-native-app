// import { HourlyModal } from './HourlyModal'
import type { HourWeather }	 from '../../pages/index'
interface HourlyTemperatureProps{ hour: HourWeather }

/*
<HourlyModal
	data={hour}
	visible={modalVisible}
	setVisible={setModalVisible}

onPressIn={() => setBackgroundColor(colors.black4)}
onPressOut={() => setBackgroundColor(colors.black2)}

<button onClick={() => setModalVisible(true)}>
			<div style={{
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
				{hour.hour}
			</p>
			
			<p style={{ flexDirection: 'row', alignItems: 'center' }}>
				<img
					src={hour.icon}
					style={{ width: 32, height: 32}}
				/>

				<p style={{ color: '#fdfdfd', fontSize: 32 }}>
					{hour.temp}°C
				</p>
			</div>
			
			<p style={{ color: '#555', textAlign: 'center' }}>
				Sensação Térmica: {hour.feels_like}°C
			</p>
			</div>
		</button>
/>
*/

function HourlyTemperature({ hour }: HourlyTemperatureProps){
	const [modalVisible, setModalVisible] = useState(false)
	const [backgroundColor, setBackgroundColor] = useState(colors.black2)
	console.log(hour)
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
				{hour.hour}
			</p>
		</button>
	)
}

export { HourlyTemperature }