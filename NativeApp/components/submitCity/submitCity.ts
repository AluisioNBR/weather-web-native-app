import axios from 'axios'
import { Render } from './render'

import type { CitySelectionProps } from '../CitySelection'
import type * as WeatherTypes from '../../App'

async function submitCity(cityValue: string,
	setCityValue: React.Dispatch<React.SetStateAction<string>>, {
	setMsgValue,
	setTemperatureVisibility,
	setLoadingWeather,
	setCityName,
	setState,
	setCurrentTemperatureValue,
	setCurrentWeatherDescription,
	setCurrentWeatherIcon,
	setCurrentFeels_likeValue,
	setCurrentHumidityValue,
	setCurrentUviValue,
	setAmountOfRain,
	setAmountOfSnow,
	setTemperatureForHour,
	setTemperatureForDay
}: CitySelectionProps) {
	const information = await fetchWeatherInformation(cityValue, setLoadingWeather);
	verifyResponse(information, {
		setMsgValue,
		setTemperatureVisibility,
		setCityName,
		setState,
		setCurrentTemperatureValue,
		setCurrentWeatherDescription,
		setCurrentWeatherIcon,
		setCurrentFeels_likeValue,
		setCurrentHumidityValue,
		setCurrentUviValue,
		setAmountOfRain,
		setAmountOfSnow,
		setTemperatureForHour,
		setTemperatureForDay
	} as CitySelectionProps)
	setCityValue("")
}

interface FoundDataOfRequest{
  cod: number;
  city: string;
  state: string;
  current: WeatherTypes.CurrentWeather;
  hourly: WeatherTypes.HourWeather[];
  daily: WeatherTypes.DayWeather[];
}

interface NotFoundDataOfRequest{
  cod: number;
  msg: string
}

async function fetchWeatherInformation(cityValue: string,
	setLoadingWeather: React.Dispatch<React.SetStateAction<boolean>>):
	Promise<FoundDataOfRequest | NotFoundDataOfRequest> {
	try {
		const data = await axios.get(`https://weather-webapp-tau.vercel.app/api/${cityValue}`, {
			params: {
				myApiSecret: process.env.MY_API_SECRET
			}
		})
		setTimeout(() => setLoadingWeather(false), 5000)
	  return await data.data
	} catch (error) {
	  return {
			cod: 502,
			msg: "Ocorreu um problema com a conexão com o servidor. Aguarde um pouco e tente novamente!"
	  }
	}
}

function verifyResponse(information: FoundDataOfRequest | NotFoundDataOfRequest, {
	setMsgValue,
	setTemperatureVisibility,
	setCityName,
	setState,
	setCurrentTemperatureValue,
	setCurrentWeatherDescription,
	setCurrentWeatherIcon,
	setCurrentFeels_likeValue,
	setCurrentHumidityValue,
	setCurrentUviValue,
	setAmountOfRain,
	setAmountOfSnow,
	setTemperatureForHour,
	setTemperatureForDay
}: CitySelectionProps){
	if (information.cod === 200)
	  Render.renderInformations(information as FoundDataOfRequest, {
			setTemperatureVisibility,
			setCityName,
			setState,
			setCurrentTemperatureValue,
			setCurrentWeatherDescription,
			setCurrentWeatherIcon,
			setCurrentFeels_likeValue,
			setCurrentHumidityValue,
			setCurrentUviValue,
			setAmountOfRain,
			setAmountOfSnow,
			setTemperatureForHour,
			setTemperatureForDay
		})
	else{
		const informationFailed = information as NotFoundDataOfRequest
	  Render.renderErr(informationFailed.msg, {
			setMsgValue,
			setTemperatureVisibility
		})
	}
}

export { submitCity }
export type { FoundDataOfRequest, NotFoundDataOfRequest }