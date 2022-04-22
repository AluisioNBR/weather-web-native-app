import { useState, useEffect } from "react";
import { useFonts } from 'expo-font';
import { Text, View, Pressable, TextInput } from 'react-native';
import * as Location from 'expo-location';
import { submitCity } from './submitCity/submitCity'

function CitySelection({
  setMsgValue,
  setTemperatureVisibility,
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
  const [cityValue, setCityValue] = useState("");
  let stopCall = false

  const [statusForegroundLocation, requestPermissionForegroundLocation] = Location.useForegroundPermissions()
  const [statusBackgroundLocation, requestPermissionBackgroundLocation] = Location.useBackgroundPermissions()
  
  useEffect(async() =>{
    if(!stopCall){
      if(statusForegroundLocation == null || statusForegroundLocation.status != "granted")
        requestPermissionForegroundLocation()
      if(statusBackgroundLocation == null || statusBackgroundLocation.status != "granted")
        requestPermissionBackgroundLocation()

      const foregroundCondition = (statusForegroundLocation != null && statusForegroundLocation.status === "granted")
      const backgroundCondition = (statusBackgroundLocation != null && statusBackgroundLocation.status === "granted")
      if(foregroundCondition && backgroundCondition){
        const pos = await Location.getCurrentPositionAsync(), localInfos = await Location.reverseGeocodeAsync({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        })
        const city = localInfos[0].city === null ? localInfos[0].district: localInfos[0].city
        
        submitCity(
          `${city}, ${localInfos[0].region}`,
          setCityValue,
          {
            setMsgValue,
            setTemperatureVisibility,
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
        )
        
        stopCall = true
      }
      else if(
        (statusForegroundLocation != null) &&
        (statusBackgroundLocation != null) &&
        (statusForegroundLocation.status != "granted") &&
        (statusBackgroundLocation.status != "granted"))
        setMsgValue("Informe sua cidade para começarmos!")
    }
  }, [stopCall, statusForegroundLocation, statusBackgroundLocation])

  const [fontLoaded] = useFonts({
    'Poppins': require('./../assets/Poppins/Poppins-Regular.ttf'),
  })

  return (
    <View>
      <View style={{
          fontFamily: 'Poppins',
          color: '#fdfdfd',
          fontSize: 20,
          alignItems: 'center'
        }}>
        <View>
          <Text style={{ color: '#fdfdfd', fontSize: 20, fontFamily: 'Poppins' }}>
            Informe sua cidade:
          </Text>
        </View>

        <TextInput
          style={{
            fontFamily: 'Poppins',
            fontSize: 20,
            padding: 8,
            backgroundColor: '#fdfdfd',
            width: 300
          }}
          defaultValue={cityValue}
          onChangeText={newText => setCityValue(newText)}
        />

        <SubmitButton
          setCityValue={setCityValue}
          submitCity={submitCity}
          cityValue={cityValue}
        />
      </View>
    </View>
  );
}

function SubmitButton({
  setCityValue,
  submitCity,
  cityValue
}){
  const [buttonColor, setButtonColor] = useState('#777')
  const [loaded] = useFonts({
    'Poppins': require('../assets/Poppins/Poppins-Regular.ttf'),
  })

  return (
    <Pressable
      onPress={() => submitCity(
        cityValue,
        setCityValue,
        {
          setMsgValue,
          setTemperatureVisibility,
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
      )}
      onPressIn={() => setButtonColor('#999')}
      onPressOut={() => setButtonColor('#777')}
    >
      <View style={{ backgroundColor: buttonColor, padding: 8, borderRadius: 50 }}>
        <Text style={{ color: '#fdfdfd', fontSize: 18, fontFamily: 'Poppins' }}>Selecionar</Text>
      </View>
    </Pressable>
  )
}

export { CitySelection };
