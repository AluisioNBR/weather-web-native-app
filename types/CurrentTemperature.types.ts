import type { CurrentWeather } from "./submitCity/weatherStateReducer.types";

interface CurrentTemperatureProps {
  msg: string;
  visibility: boolean;
  loadingWeather: boolean;
  children: CurrentWeather;
}

interface LocalizationProps {
  city: string;
  state: string;
}

export type { CurrentTemperatureProps, LocalizationProps };
