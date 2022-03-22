import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from "react";
import { View, ScrollView } from 'react-native';

import { styles } from './styles';
import { Temperature } from './components/temperature'
import { CitySelection } from './components/citySelection'

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

      <ScrollView style={styles.main}>
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
      </ScrollView>
    </View>
  );
}