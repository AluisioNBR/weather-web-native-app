import type { CurrentWeather, HourWeather, DayWeather } from '../../App'
import type { FoundDataOfRequest } from './submitCity'
import type * as RenderInterfaces from './renderInterfaces'

const Render = {
  renderErr(msg: string, { setMsgValue, setTemperatureVisibility }: RenderInterfaces.RenderErrFunctions){
    setMsgValue(msg);
    setTemperatureVisibility(false);
  },
  
  renderInformations(information: FoundDataOfRequest, {
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
  }: RenderInterfaces.RenderInformationsFunctions){
    setCityName(information.city);
    setState(information.state);
  
    Render.renderCurrentInformations( information.current, {
      setCurrentTemperatureValue,
      setCurrentWeatherDescription,
      setCurrentWeatherIcon,
      setCurrentFeels_likeValue,
      setCurrentHumidityValue,
      setCurrentUviValue,
      setAmountOfRain,
      setAmountOfSnow,
    })
    Render.renderHourlyInformations(information.hourly, setTemperatureForHour)
    Render.renderDailyInformations(information.daily, setTemperatureForDay)
  
    setTemperatureVisibility(true);
  },
  
  renderCurrentInformations(information: CurrentWeather, {
    setCurrentTemperatureValue,
    setCurrentWeatherDescription,
    setCurrentWeatherIcon,
    setCurrentFeels_likeValue,
    setCurrentHumidityValue,
    setCurrentUviValue,
    setAmountOfRain,
    setAmountOfSnow,
  }: RenderInterfaces.renderCurrentInformationsFunctions){
    setCurrentWeatherIcon(information.icon);
    setCurrentTemperatureValue(information.temp);
    setCurrentWeatherDescription(information.description);
    setCurrentFeels_likeValue(information.feels_like);
    setCurrentHumidityValue(information.humidity);
    setCurrentUviValue(information.uvi)
    setAmountOfRain(information.rain)
    setAmountOfSnow(information.snow)
  },
  
  renderHourlyInformations(informations: HourWeather[],
    setTemperatureForHour: React.Dispatch<React.SetStateAction<HourWeather[] | never[]>>){
    const content = []
    for(let hour of informations)
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
    setTemperatureForHour(content)
  },
  
  renderDailyInformations(informations: DayWeather[],
    setTemperatureForDay: React.Dispatch<React.SetStateAction<DayWeather[] | never[]>>){
    const content = []
    for(let day of informations)
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
    setTemperatureForDay(content)
  }
}

export { Render }