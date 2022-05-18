import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'

import { CitySelection } from './components/CitySelection'
import { CurrentTemperature } from './components/CurrentTemperature'
import { HourlyTemperaturesContainer } from './components/HourlyTemperaturesContainer'
import { DailyTemperaturesContainer } from './components/DailyTemperatureContainer';
import { AnimatedLoading } from './components/AnimatedLoading'
import { colors } from './components/colors';

interface NoRain{ rainy: string }

interface AmountOfRain{ rainy: string, rain: number }

interface NoSnow{ snowed: string }

interface AmountOfSnow{ snowed: string, snow: number }

interface CurrentWeather{
  temp: number;
  feels_like: number;
  uvi: number;
  humidity: number;
  description: string;
  icon: string;
  rain: NoRain | AmountOfRain;
  snow: NoSnow | AmountOfSnow
;
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
  rain: NoRain | AmountOfRain;
  snow: NoSnow | AmountOfSnow
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
  rain: NoRain | AmountOfRain;
  snow: NoSnow | AmountOfSnow;
}

export default function App() {
  const [temperatureVisibility, setTemperatureVisibility] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false)

  const [cityName, setCityName] = useState("undefined");
  const [state, setState] = useState("undefined");

  const [currentWeatherIcon, setCurrentWeatherIcon] = useState("undefined.png");
  const [currentTemperatureValue, setCurrentTemperatureValue] = useState(30);
  const [currentWeatherDescription, setCurrentWeatherDescription] = useState("undefined");
  const [currentFeels_likeValue, setCurrentFeels_likeValue] = useState(30);
  const [currentHumidityValue, setCurrentHumidityValue] = useState(0);
  const [currentUviValue, setCurrentUviValue] = useState(0)
  const [amountOfRain, setAmountOfRain]: [
    NoRain | AmountOfRain,
    React.Dispatch<React.SetStateAction<NoRain | AmountOfRain>>] = useState({ rainy: 'no-rain' })
  const [amountOfSnow, setAmountOfSnow]: [
    NoSnow | AmountOfSnow,
    React.Dispatch<React.SetStateAction<NoSnow | AmountOfSnow>>] = useState({ snowed: 'no-snow' })

  const [temperatureForHour, setTemperatureForHour]: [any[] | HourWeather[], React.Dispatch<React.SetStateAction<any[] | HourWeather[]>>] = useState([])
  const [temperatureForDay, setTemperatureForDay]: [any[] | DayWeather[], React.Dispatch<React.SetStateAction<any[] | DayWeather[]>>] = useState([])

  const [msgValue, setMsgValue] = useState(
    "Informe sua cidade para começarmos!"
  );

  const [appLoaded, setAppLoaded] = useState(false)
  const [fontLoaded] = useFonts({
    'Poppins': require('./assets/Poppins/Poppins-Regular.ttf'),
  })

  let loadingFont = setInterval(() => {
    if(!fontLoaded)
      setAppLoaded(false)
    else if(fontLoaded){
      setAppLoaded(true)
    }  
  }, 1000)

  useEffect(() => {
    clearInterval(loadingFont)
  }, [appLoaded])

  if(!appLoaded)
    return <AppLoading />
  else if(loadingWeather)
    return <AnimatedLoading/>
  else
    return (
      <View style={{
        flex: 1,
        backgroundColor: colors.mainBlack,
        alignItems: 'center',
        padding: 16
      }}>
        <StatusBar style="auto" />

        <View style={{ paddingTop: 32, flex: 1 }}>
          <CitySelection
            setMsgValue={setMsgValue}
            setTemperatureVisibility={setTemperatureVisibility}
            setLoadingWeather={setLoadingWeather}
            setCityName={setCityName}
            setState={setState}
            setCurrentTemperatureValue={setCurrentTemperatureValue}
            setCurrentWeatherDescription={setCurrentWeatherDescription}
            setCurrentWeatherIcon={setCurrentWeatherIcon}
            setCurrentFeels_likeValue={setCurrentFeels_likeValue}
            setCurrentHumidityValue={setCurrentHumidityValue}
            setCurrentUviValue={setCurrentUviValue}
            setAmountOfRain={setAmountOfRain}
            setAmountOfSnow={setAmountOfSnow}
            setTemperatureForHour={setTemperatureForHour}
            setTemperatureForDay={setTemperatureForDay}
          />

          <CurrentTemperature
            msg={msgValue}
            city={cityName}
            state={state}
            icon={currentWeatherIcon}
            temperature={currentTemperatureValue}
            description={currentWeatherDescription}
            feels_like={currentFeels_likeValue}
            humidity={currentHumidityValue}
            uvi={currentUviValue}
            rain={amountOfRain}
            snow={amountOfSnow}
            visibility={temperatureVisibility}
            loadingWeather={loadingWeather}
          />

          <HourlyTemperaturesContainer hourlyTemperatures={temperatureForHour}/>

          <DailyTemperaturesContainer dailyTemperatures={temperatureForDay}/>
        </View>
      </View>
    );
}

export type { NoRain, NoSnow, AmountOfRain, AmountOfSnow, CurrentWeather, HourWeather, DayWeather }