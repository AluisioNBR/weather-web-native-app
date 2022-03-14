import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';

import { CitySelection } from "./components/citySelection";
import { Temperature } from "./components/temperature";

export default function App() {
  const [temperatureVisibility, setTemperatureVisibility] = useState(false);

  const [cityName, setCityName] = useState("undefined");
  const [country, setCountry] = useState("undefined");
  const [weatherIcon, setWeatherIcon] = useState("undefined.png");
  const [temperatureValue, setTemperatureValue] = useState(30);
  const [weatherDescription, setWeatherDescription] = useState("undefined");

  const [feels_likeValue, setfeels_likeValue] = useState(30);
  const [temperatureMax, setTemperatureMax] = useState(30);
  const [temperatureMin, setTemperatureMin] = useState(30);
  const [humidityValue, setHumidityValue] = useState(0);

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
          setCountry={setCountry}
          setTemperatureValue={setTemperatureValue}
          setWeatherDescription={setWeatherDescription}
          setWeatherIcon={setWeatherIcon}
          setfeels_likeValue={setfeels_likeValue}
          setTemperatureMax={setTemperatureMax}
          setTemperatureMin={setTemperatureMin}
          setHumidityValue={setHumidityValue}
        />

        <Temperature
          msg={msgValue}
          city={cityName}
          country={country}
          icon={weatherIcon}
          temperature={temperatureValue}
          description={weatherDescription}
          feels_like={feels_likeValue}
          temp_max={temperatureMax}
          temp_min={temperatureMin}
          humidity={humidityValue}
          visibility={temperatureVisibility}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },

  main: {
    paddingTop: 32,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },

  temperatureContainer: {
    justifyContent: 'space-evenly',
  },

  formCity:{
    color: '#fdfdfd',
    fontSize: 20,
    alignItems: 'center'
  },

  formCityButtonInput:{
    fontSize: 20,
    padding: 8
  },

  MainTemperatureContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  },

  MainTemperature: {
    flex: 1,
    alignItems: center,
    justifyContent: 'center',

    width: 240,
    height:  240,
    padding: 24,
    borderRadius: 24,
    
    backgroundColor: '#0C42FF',
    color: '#fdfdfd',

    textAlign: 'center'
  },

  local:{
    textAlign: 'center'
  },

  currentTemperature: {
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  weatherDescription: {
    fontSize: 22,
    alignItems: 'center',
  },

  temperatureDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',

    flex: 3,
  },

  containerDetails: {
    width: 160,
    height: 160,

    padding: 24,
    borderRadius: 16,

    backgroundColor: '#F216AA',
    color: '#fdfdfd',
  },

  containerDetailsTitle: {
    textAlign: 'center'
  },

  MinMaxDiv: {
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },

  categoryValue:{
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export { styles }