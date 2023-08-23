import {
  Rain,
  Snow,
  NoRain,
  NoSnow,
} from "../submitCity/weatherStateReducer.types";

export interface CompostTemperatureDetailsProps {
  children: {
    humidity: number;
    uvi: number;
    pop: number;
    rain: NoRain | Rain;
    snow: NoSnow | Snow;
  };
}

export interface TemperatureDetailsProps {
  humidity: number;
  uvi: number;
  rain: NoRain | Rain;
  snow: NoSnow | Snow;
}

export interface TemperatureDetailsOnPreciptationProps {
  humidity: string;
  uvi: string;
  children: string;
  preciptation: string;
}

export interface TemperatureDetailsOnClearWeatherProps {
  humidity: string;
  uvi: string;
}
