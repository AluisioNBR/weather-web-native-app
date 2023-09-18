import type {
  CurrentWeather,
  HourWeather,
  DayWeather,
} from "./submitCity/weatherStateReducer.types";

interface CitySelectionProps {
  setMsgValue: React.Dispatch<React.SetStateAction<string>>;
  setTemperatureVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingWeather: React.Dispatch<React.SetStateAction<boolean>>;
  setLocalization: (city: string, state: string) => void;
  setCurrentWeather: (currentWeather: CurrentWeather) => void;
  setHourlyWeather: (hourlyWeather: HourWeather[]) => void;
  setDailyWeather: (dailyWeather: DayWeather[]) => void;
}

interface SubmitButtonProps {
  children: ContentContext;
}

interface ContentContext {
  cityValue: string;
  setCityValue: React.Dispatch<React.SetStateAction<string>>;
  citySelectionProps: CitySelectionProps;
}

interface ServerError {
  cod: number;
  msg: string;
}

export type {
  CitySelectionProps,
  SubmitButtonProps,
  ContentContext,
  ServerError,
};
