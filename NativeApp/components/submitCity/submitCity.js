import axios from 'axios'

async function submitCity(
	cityValue,
	setCityValue,
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
	}
) {
	const information = await fetchWeatherInformation(cityValue);
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
		})
	setCityValue("")
}

async function fetchWeatherInformation(cityValue) {
	try {
	  const data = await axios.get(`https://weather-webapp-jim4xz2ag-aluisionbr.vercel.app/api/${cityValue}`, {
		params: {
		  myApiSecret: '9b7nn6gu275ssd0db09jj2232ppxxx27'
		  date: new Date().toLocaleString().split(' ')[0]
		}
	  })
	  return await data.data
	} catch (error) {
	  return {
		cod: 502,
		msg: "Ocorreu um problema com a conexão com o servidor. Tente novamente mais tarde!"
	  }
	}
}

function verifyResponse(
	information,
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
	}
){
	if (information.cod === 200)
	  renderInformations(
		information, 
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
		}
	  )
	else
	  renderErr(
		information.msg, {
			setMsgValue,
			setTemperatureVisibility
		})
}

function renderErr(
	msg,
	{
		setMsgValue,
		setTemperatureVisibility
	}
){
	setMsgValue(msg);
	setTemperatureVisibility(false);
}

function renderInformations(
	information,
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
	}
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

function renderCurrentInformations(
	information,
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

function renderHourlyInformations(informations, setTemperatureForHour){
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
		rain: {
		  rainy: hour.rain.rainy,
		  rain: hour.rain.rain
		},
		snow: {
		  snowed: hour.snow.snowed,
		  snow: hour.snow.snow
		}
	  })
	}
	setTemperatureForHour(content)
}

function renderDailyInformations(informations, setTemperatureForDay){
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
		rain: {
		  rainy: day.rain.rainy,
		  rain: day.rain.rain
		},
		snow: {
		  snowed: day.snow.snowed,
		  snow: day.snow.snow
		}
	  })
	}
	setTemperatureForDay(content)
}

export { submitCity }