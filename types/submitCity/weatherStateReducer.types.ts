interface APIProps{
  myApiSecret: string;
}

interface WeatherReducerAction {
  type: string;
  value: string | CurrentWeather | HourWeather[] | DayWeather[]
}

interface WeatherState{
  city: string;
  state: string;
  currentWeather: CurrentWeather;
  hourlyWeather: HourWeather[] | [];
  dailyWeather: DayWeather[] | [];
}

interface CurrentWeather{
  temp: number;
  feels_like: number;
  uvi: number;
  humidity: number;
  description: string;
  icon: string;
  rain: NoRain | Rain;
  snow: NoSnow | Snow
}

interface HourWeather{
  hour: string;
  temp: number;
  feels_like: number;
  uvi: number;
  humidity: number;
  description: string;
  icon: string;
  pop: number;
  rain: NoRain | Rain;
  snow: NoSnow | Snow
}

interface DayWeather{
  moon_phase: string;
  temp: {
    morn: number;
    day: number;
    eve: number;
    night: number;
    min: number;
    max: number;
  };
  feels_like: {
    morn: number;
    day: number;
    eve: number;
    night: number;
  };
  uvi: number;
  humidity: number;
  description: string;
  icon: string;
  pop: number;
  rain: NoRain | Rain;
  snow: NoSnow | Snow;
}

interface NoRain{
  rainy: 'no-rain' 
}

interface Rain{
  rainy: 'rain',
  rain: number
}

interface NoSnow{
  snowed: 'no-snow'
}

interface Snow{
  snowed: 'snow',
  snow: number
}

export type {
  APIProps,
  WeatherState,
  CurrentWeather,
  HourWeather,
  DayWeather,
  NoRain,
  Rain,
  NoSnow,
  Snow,
  WeatherReducerAction
}