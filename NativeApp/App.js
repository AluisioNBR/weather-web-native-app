import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';

function CitySelection({
  setMsgValue,
  setTemperatureVisibility,
  setCityName,
  setCountry,
  setTemperatureValue,
  setWeatherDescription,
  setWeatherIcon,
  setfeels_likeValue,
  setTemperatureMax,
  setTemperatureMin,
  setHumidityValue
}) {
  const [cityValue, setCityValue] = useState("");

  async function WeatherInf(cityValue) {
    const inf = await fetch(
      `https://weather-webapp-seven.vercel.app/api/${cityValue}`
    );
    const infJSON = await inf.json();

    return infJSON;
  }

  async function submitCity(cityValue) {
    const inf = await WeatherInf(cityValue);
    console.log(inf);

    if (inf.cod === 200) {
      setCityName(inf.city);
      setCountry(inf.country);
      setWeatherIcon(inf.icon);
      setTemperatureValue(inf.main.temperature);
      setWeatherDescription(inf.description);

      console.log(inf.main.feels_like);
      setfeels_likeValue(inf.main.feels_like);
      setTemperatureMax(inf.main.temp_max);
      setTemperatureMin(inf.main.temp_min);
      setHumidityValue(inf.main.humidity);

      setTemperatureVisibility(true);
    }
    else {
      setMsgValue(inf.msg);
      setTemperatureVisibility(false);
    }

    return "";
  }

  return (
    <View>
      <View style={styles.formCity}>
        <Text>Informe sua cidade:</Text>
        <br />
        <TextInput
          style={styles.formCityButtonInput}
          defaultValue={cityValue}
          onChangeText={(newText) => setCityValue(newText)}
        />

        <Button
          style={styles.formCityButtonInput}
          onPress={() => setCityValue(submitCity(cityValue))}>
          Selecionar
        </Button>
      </View>
    </View>
  );
}

function MainTemperature(props) {
  return (
    <View style={styles.MainTemperatureContainer}>
      <View style={styles.MainTemperature}>
        <Text style={styles.local}>
          {props.city}, {props.country}
        </Text>

        <View>
          <View style={styles.currentTemperature}>
            <Image
              source={{uri: props.icon}}
              style={{ width: 32, height: 32}}
            />
            <Text>
              {props.temperature}°C
            </Text>
          </View>

          <View style={styles.weatherDescription}>{props.description}</View>
        </View>
      </View>
    </View>
  );
}

function AdditionalInf(props) {
  if(props.MinOrMax){
    return (
      <View style={styles.MinMaxDiv}>
        <Text style={styles.containerDetailsTitle}>{props.children}</Text>

        <View style={styles.categoryValue}>{props.value}</View>
      </View>
    )
  }
  else return (
      <View>
        <Text style={styles.containerDetailsTitle}>{props.children}</Text>

        <View style={styles.categoryValue}>{props.value}</View>
      </View>
    )
}

function TemperatureDetails(props) {
  return (
    <View style={styles.temperatureDetails}>
      <View style={styles.containerDetails}>
        <AdditionalInf value={`${props.feels_like}°C`}>
          Sensação Térmica
        </AdditionalInf>
      </View>

      <View style={styles.containerDetails} style={styles.minMax}>
        <AdditionalInf MinOrMax={true} value={`${props.temp_max}°C`}>Max:</AdditionalInf>

        <AdditionalInf MinOrMax={true} value={`${props.temp_min}°C`}>Min:</AdditionalInf>
      </View>

      <View style={styles.containerDetails}>
        <AdditionalInf value={`${props.humidity}%`}>Humidade</AdditionalInf>
      </View>
    </View>
  );
}

function Temperature(props) {
  if (props.visibility)
    return (
      <View style={styles.temperatureContainer}>
        <MainTemperature
          city={props.city}
          country={props.country}
          icon={props.icon}
          temperature={props.temperature}
          description={props.description}
        />

        <TemperatureDetails
          feels_like={props.feels_like}
          temp_max={props.temp_max}
          temp_min={props.temp_min}
          humidity={props.humidity}
        />
      </View>
    );
  else
    return (
      <View>
        <Text style={styles.MainTemperature}>{props.msg}</Text>
      </View>
    );
}

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