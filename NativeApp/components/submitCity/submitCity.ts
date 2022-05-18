import axios from 'axios'

import type { CitySelectionProps } from '../CitySelection'
import type { NoRain, NoSnow, AmountOfRain, AmountOfSnow, CurrentWeather, HourWeather, DayWeather } from '../../App'

async function submitCity(
	cityValue: string,
	setCityValue: React.Dispatch<React.SetStateAction<string>>,
	{
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
	}: CitySelectionProps
) {
	const information = await fetchWeatherInformation(cityValue, setLoadingWeather);
	verifyResponse(
		information, {
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
  current: CurrentWeather;
  hourly: HourWeather[];
  daily: DayWeather[];
}

interface NotFoundDataOfRequest{
  cod: number;
  msg: string
}

async function fetchWeatherInformation(cityValue: string, setLoadingWeather: React.Dispatch<React.SetStateAction<boolean>>): Promise<FoundDataOfRequest | NotFoundDataOfRequest> {
	let limiter = 0
	try {
		if(limiter > 0)
			throw new Error("Ocorreu um problema com a conexão com o servidor. Aguarde um pouco e tente novamente!")
		  const data = await axios.get(`https://weather-webapp-seven.vercel.app/api/${cityValue}`, {
				params: {
				  myApiSecret: process.env.MY_API_SECRET
				}
	  	})
		  limiter += 1
		  setTimeout(() => {
		  	limiter = 0
		  	setLoadingWeather(false)
		  }, 5000)
	  return await data.data
	} catch (error) {
	  return {
			cod: 502,
			msg: error
	  }
	}
}

function verifyResponse(
	information: FoundDataOfRequest | NotFoundDataOfRequest,
	{
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
	}: CitySelectionProps
){
	if (information.cod === 200)
	  renderInformations(
		information as FoundDataOfRequest, 
		{
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
	  renderErr(
			informationFailed.msg, {
			setMsgValue,
			setTemperatureVisibility
		})
	}
}

interface RenderErrFunctions{
	setMsgValue: React.Dispatch<React.SetStateAction<string>>;
	setTemperatureVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

function renderErr(
	msg: string,
	{
		setMsgValue,
		setTemperatureVisibility
	}: RenderErrFunctions
){
	setMsgValue(msg);
	setTemperatureVisibility(false);
}

interface RenderInformationsFunctions{
	setTemperatureVisibility: React.Dispatch<React.SetStateAction<boolean>>;
	setCityName: React.Dispatch<React.SetStateAction<string>>
	setState: React.Dispatch<React.SetStateAction<string>>;
	setCurrentTemperatureValue: React.Dispatch<React.SetStateAction<number>>;
	setCurrentWeatherDescription: React.Dispatch<React.SetStateAction<string>>;
	setCurrentWeatherIcon: React.Dispatch<React.SetStateAction<string>>;
	setCurrentFeels_likeValue: React.Dispatch<React.SetStateAction<number>>;
	setCurrentHumidityValue: React.Dispatch<React.SetStateAction<number>>;
	setCurrentUviValue: React.Dispatch<React.SetStateAction<number>>;
	setAmountOfRain: React.Dispatch<React.SetStateAction<NoRain | AmountOfRain>>;
	setAmountOfSnow: React.Dispatch<React.SetStateAction<NoSnow | AmountOfSnow>>;
	setTemperatureForHour: React.Dispatch<React.SetStateAction<HourWeather[] | never[]>>;
	setTemperatureForDay: React.Dispatch<React.SetStateAction<DayWeather[] | never[]>>;
}

function renderInformations(
	information: FoundDataOfRequest,
	{
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
	}: RenderInformationsFunctions
){
	setCityName(information.city);
	setState(information.state);

	renderCurrentInformations(
		information.current,
		{
			setCurrentTemperatureValue,
			setCurrentWeatherDescription,
			setCurrentWeatherIcon,
			setCurrentFeels_likeValue,
			setCurrentHumidityValue,
			setCurrentUviValue,
			setAmountOfRain,
			setAmountOfSnow,
		}
	)
	renderHourlyInformations(information.hourly, setTemperatureForHour)
	renderDailyInformations(information.daily, setTemperatureForDay)

	setTemperatureVisibility(true);
}

interface renderCurrentInformationsFunctions{
	setCurrentTemperatureValue: React.Dispatch<React.SetStateAction<number>>,
	setCurrentWeatherDescription: React.Dispatch<React.SetStateAction<string>>,
	setCurrentWeatherIcon: React.Dispatch<React.SetStateAction<string>>,
	setCurrentFeels_likeValue: React.Dispatch<React.SetStateAction<number>>,
	setCurrentHumidityValue: React.Dispatch<React.SetStateAction<number>>,
	setCurrentUviValue: React.Dispatch<React.SetStateAction<number>>,
	setAmountOfRain: React.Dispatch<React.SetStateAction<NoRain | AmountOfRain>>,
	setAmountOfSnow: React.Dispatch<React.SetStateAction<NoSnow | AmountOfSnow>>,
}

function renderCurrentInformations(
	information: CurrentWeather,
	{
		setCurrentTemperatureValue,
		setCurrentWeatherDescription,
		setCurrentWeatherIcon,
		setCurrentFeels_likeValue,
		setCurrentHumidityValue,
		setCurrentUviValue,
		setAmountOfRain,
		setAmountOfSnow,
	}: renderCurrentInformationsFunctions
){
	setCurrentWeatherIcon(information.icon);
	setCurrentTemperatureValue(information.temp);
	setCurrentWeatherDescription(information.description);
	setCurrentFeels_likeValue(information.feels_like);
	setCurrentHumidityValue(information.humidity);
	setCurrentUviValue(information.uvi)
	setAmountOfRain(information.rain)
	setAmountOfSnow(information.snow)
}

function renderHourlyInformations(informations: HourWeather[], setTemperatureForHour: React.Dispatch<React.SetStateAction<HourWeather[] | never[]>>){
	const content = []
	for(let hour of informations){
	  content.push({
		hour: hour.hour,
		temp: hour.temp,
		feels_like: hour.feels_like,
		uvi: hour.uvi,
		humidity: hour.humidity,
		description: hour.description,
		icon: hour.icon,
		pop: hour.pop,
		rain: hour.rain,
		snow: hour.snow
	  })
	}
	setTemperatureForHour(content)
}

function renderDailyInformations(informations: DayWeather[], setTemperatureForDay: React.Dispatch<React.SetStateAction<DayWeather[] | never[]>>){
	const content = []
	for(let day of informations){
	  content.push({
		moon_phase: day.moon_phase,
		temp: {
		  morn: day.temp.morn,
		  day: day.temp.day,
		  eve: day.temp.eve,
		  night: day.temp.night,
		  min: day.temp.min,
		  max: day.temp.max
		},
		feels_like: {
		  morn: day.feels_like.morn,
		  day: day.feels_like.day,
		  eve: day.feels_like.eve,
		  night: day.feels_like.night
		},
		uvi: day.uvi,
		humidity: day.humidity,
		description: day.description,
		icon: day.icon,
		pop: day.pop,
		rain: day.rain,
		snow: day.snow
	  })
	}
	setTemperatureForDay(content)
}

export { submitCity }
