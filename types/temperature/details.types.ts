import {
  AmountOfRain,
  AmountOfSnow,
  NoRain,
  NoSnow
} from "../submitCity/weatherStateReducer.types";

interface CompostTemperatureDetailsProps {
  children: {
    humidity: number;
    uvi: number;
    pop: number;
    rain: NoRain | AmountOfRain;
    snow: NoSnow | AmountOfSnow
  }
}

interface TemperatureDetailsProps{
  humidity: number;
  uvi: number;
  rain: NoRain | AmountOfRain;
  snow: NoSnow | AmountOfSnow
}

interface TemperatureDetailsOnPreciptationProps {
  humidity: string,
  uvi: string,
  children: string,
  preciptation: string
}

interface TemperatureDetailsOnClearWeatherProps {
  humidity: string,
  uvi: string,
}

export {
  CompostTemperatureDetailsProps,
  TemperatureDetailsProps,
  TemperatureDetailsOnPreciptationProps,
  TemperatureDetailsOnClearWeatherProps
}