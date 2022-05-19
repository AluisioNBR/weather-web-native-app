import type * as WeatherTypes from '../../App'

interface RenderErrFunctions{
  setMsgValue: React.Dispatch<React.SetStateAction<string>>;
  setTemperatureVisibility: React.Dispatch<React.SetStateAction<boolean>>
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
  setAmountOfRain: React.Dispatch<React.SetStateAction<WeatherTypes.NoRain | WeatherTypes.AmountOfRain>>;
  setAmountOfSnow: React.Dispatch<React.SetStateAction<WeatherTypes.NoSnow | WeatherTypes.AmountOfSnow>>;
  setTemperatureForHour: React.Dispatch<React.SetStateAction<WeatherTypes.HourWeather[] | never[]>>;
  setTemperatureForDay: React.Dispatch<React.SetStateAction<WeatherTypes.DayWeather[] | never[]>>;
}

interface renderCurrentInformationsFunctions{
  setCurrentTemperatureValue: React.Dispatch<React.SetStateAction<number>>,
  setCurrentWeatherDescription: React.Dispatch<React.SetStateAction<string>>,
  setCurrentWeatherIcon: React.Dispatch<React.SetStateAction<string>>,
  setCurrentFeels_likeValue: React.Dispatch<React.SetStateAction<number>>,
  setCurrentHumidityValue: React.Dispatch<React.SetStateAction<number>>,
  setCurrentUviValue: React.Dispatch<React.SetStateAction<number>>,
  setAmountOfRain: React.Dispatch<React.SetStateAction<WeatherTypes.NoRain | WeatherTypes.AmountOfRain>>,
  setAmountOfSnow: React.Dispatch<React.SetStateAction<WeatherTypes.NoSnow | WeatherTypes.AmountOfSnow>>,
}

export type { RenderErrFunctions, RenderInformationsFunctions, renderCurrentInformationsFunctions }