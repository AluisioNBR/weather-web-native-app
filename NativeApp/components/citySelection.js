import { useState } from "react";
import { useFonts } from 'expo-font';
import { Text, View, Pressable, TextInput } from 'react-native';
import { submitCity } from './submitCity/submitCity'
import { colors } from './colors';

function CitySelection({
  setMsgValue,
  setTemperatureVisibility,
  setLoadingWeather,
  setCityName,
  setState,
  setCurrentTemperatureValue,
  setCurrentWeatherDescription,
  setCurrentWeatherIcon,
  setCurrentFeels_likeValue,
  setCurrentHumidityValue,
  setCurrentUviValue,
  setAmountOfRain,
  setAmountOfSnow,
  setTemperatureForHour,
  setTemperatureForDay
}) {
  const [fontLoaded] = useFonts({
    'Poppins': require('./../assets/Poppins/Poppins-Regular.ttf'),
  })
  const [cityValue, setCityValue] = useState('')
  const contentContext = {
    setCityValue,
    submitCity,
    cityValue,
    setMsgValue,
    setTemperatureVisibility,
    setLoadingWeather,
    setCityName,
    setState,
    setCurrentTemperatureValue,
    setCurrentWeatherDescription,
    setCurrentWeatherIcon,
    setCurrentFeels_likeValue,
    setCurrentHumidityValue,
    setCurrentUviValue,
    setAmountOfRain,
    setAmountOfSnow,
    setTemperatureForHour,
    setTemperatureForDay
  }

  return (
    <View style={{ alignItems: 'center' }}>
      <View>
        <Text style={{ color: colors.mainWhite, fontSize: 20, fontFamily: 'Poppins' }}>
          Informe sua cidade:
        </Text>
      </View>

      <TextInput
        style={{
          fontFamily: 'Poppins',
          fontSize: 20,
          padding: 8,
          backgroundColor: colors.mainWhite,
          width: 300
        }}
        defaultValue={cityValue}
        onChangeText={newText => setCityValue(newText)}
      />

      <SubmitButton content={contentContext} />
    </View>
  );
}

function SubmitButton({ content }){
  const [buttonColor, setButtonColor] = useState(colors.black4)
  const [loaded] = useFonts({
    'Poppins': require('../assets/Poppins/Poppins-Regular.ttf'),
  })
  const {
    setCityValue,
    submitCity,
    cityValue,
    setMsgValue,
    setTemperatureVisibility,
    setLoadingWeather,
    setCityName,
    setState,
    setCurrentTemperatureValue,
    setCurrentWeatherDescription,
    setCurrentWeatherIcon,
    setCurrentFeels_likeValue,
    setCurrentHumidityValue,
    setCurrentUviValue,
    setAmountOfRain,
    setAmountOfSnow,
    setTemperatureForHour,
    setTemperatureForDay
  } = content

  const submitCityParams = {
    setMsgValue,
    setTemperatureVisibility,
    setLoadingWeather,
    setCityName,
    setState,
    setCurrentTemperatureValue,
    setCurrentWeatherDescription,
    setCurrentWeatherIcon,
    setCurrentFeels_likeValue,
    setCurrentHumidityValue,
    setCurrentUviValue,
    setAmountOfRain,
    setAmountOfSnow,
    setTemperatureForHour,
    setTemperatureForDay
  }

  return (
    <Pressable
      onPress={() => {
        setLoadingWeather(true)
        submitCity(cityValue, setCityValue, submitCityParams)
      }}
      onPressIn={() => setButtonColor(colors.gray3)}
      onPressOut={() => setButtonColor(colors.black4)}
    >
      <View style={{ backgroundColor: buttonColor, padding: 8, borderRadius: 50 }}>
        <Text style={{ color: colors.mainWhite, fontSize: 18, fontFamily: 'Poppins' }}>Selecionar</Text>
      </View>
    </Pressable>
  )
}

export { CitySelection };
