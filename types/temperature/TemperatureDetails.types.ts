import type {
  NoRain,
  Rain,
  NoSnow,
  Snow,
} from "../submitCity/weatherStateReducer.types";

interface TemperatureDetailsProps {
  feels_like?: number;
  pop?: number;
  uvi: number;
  humidity: number;
  rain: NoRain | Rain;
  snow: NoSnow | Snow;
}

interface DetailsOnPreciptationProps {
  feels_like?: number;
  uvi: number;
  humidity: number;
  pop: number;
  children: string;
}

interface DetailsOnClearWeatherProps {
  feels_like?: number;
  pop?: number;
  uvi: number;
  humidity: number;
}

interface DetailsProps {
  feels_like?: number;
  pop?: number;
  uvi: number;
  humidity: number;
  children?: JSX.Element;
}

export type {
  TemperatureDetailsProps,
  DetailsOnPreciptationProps,
  DetailsOnClearWeatherProps,
  DetailsProps,
};
