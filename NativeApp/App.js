import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from "react";
import { useFonts } from 'expo-font';
import { View, Text } from 'react-native';
import AppLoading from 'expo-app-loading'

import { CitySelection } from './components/citySelection'
import { CurrentTemperature } from './components/currentTemperature'
import { HourlyTemperaturesContainer } from './components/hourlyTemperaturesContainer'
import { DailyTemperaturesContainer } from './components/dailyTemperatureContainer';

export default function App() {
  const [temperatureVisibility, setTemperatureVisibility] = useState(false);

  const [cityName, setCityName] = useState("undefined");
  const [state, setState] = useState("undefined");

  const [currentWeatherIcon, setCurrentWeatherIcon] = useState("undefined.png");
  const [currentTemperatureValue, setCurrentTemperatureValue] = useState(30);
  const [currentWeatherDescription, setCurrentWeatherDescription] = useState("undefined");
  const [currentFeels_likeValue, setCurrentFeels_likeValue] = useState(30);
  const [currentHumidityValue, setCurrentHumidityValue] = useState(0);
  const [currentUviValue, setCurrentUviValue] = useState(0)
  const [amountOfRain, setAmountOfRain] = useState({ rainy: 'no-rain' })
  const [amountOfSnow, setAmountOfSnow] = useState({ snowed: 'no-snow' })

  const [temperatureForHour, setTemperatureForHour] = useState([])
  const [temperatureForDay, setTemperatureForDay] = useState([])

  const [msgValue, setMsgValue] = useState(
    "Carregando..."
  );

  const [appLoaded, setAppLoaded] = useState(false)
  const [fontLoaded] = useFonts({
    'Poppins': require('./assets/Poppins/Poppins-Regular.ttf'),
  })

  let loadingFont = setInterval(()=>{
    if(!fontLoaded)
      setAppLoaded(false)
    else if(fontLoaded){
      setAppLoaded(true)
    }  
  }, 1000)

  useEffect(()=>{
    clearInterval(loadingFont)
    loadingFont = 0
  }, [appLoaded])

  if(!appLoaded)
    return <AppLoading />
  /*
  (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#333'
    }}>
      <Text style={{ color: '#fdfdfd', fontSize: 32 }}>Carregando...</Text>
    </View>
  )
  */
  else
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        padding: 16
      }}>
        <StatusBar style="auto" />

        <View style={{ paddingTop: 32, flex: 1 }}>
          <CitySelection
            setMsgValue={setMsgValue}
            setTemperatureVisibility={setTemperatureVisibility}
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
          />

          <HourlyTemperaturesContainer hourlyTemperatures={temperatureForHour}/>

          <DailyTemperaturesContainer dailyTemperatures={temperatureForDay}/>
        </View>
      </View>
    );
}