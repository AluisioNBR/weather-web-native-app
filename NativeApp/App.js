import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from "react";
import { View, StyleSheet } from 'react-native';

import { CitySelection } from './components/citySelection'
import { CurrentTemperature } from './components/currentTemperature'
import { HourlyTemperaturesContainer } from './components/hourlyTemperaturesContainer'
import { DailyTemperaturesContainer } from './components/dailyTemperatureContainer';

// ./assets/Poppins/Poppins-Regular.ttf

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
    "Informe sua cidade para começarmos!"
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.main}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    padding: 16
  },

  main: {
    paddingTop: 32,
    flex: 1
  }
})