import { useState } from "react";
import { useFonts } from 'expo-font';
import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';
import axios from 'axios'

const styles = StyleSheet.create({
  citySelection: {
    flex: 1
  },

  formCity:{
    color: '#fdfdfd',
    fontSize: 20,
    alignItems: 'center'
  },

  formCityButtonInput:{
    fontSize: 20,
    padding: 8,
    backgroundColor: '#fdfdfd',
    width: 300
  }
})

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
  const [loaded] = useFonts({
    'Poppins': require('../assets/Poppins/Poppins-Regular.ttf'),
  })

  const [cityValue, setCityValue] = useState("");

  async function fetchWeatherInformation(cityValue) {
    // * Teste: https://weather-webapp-jim4xz2ag-aluisionbr.vercel.app/api/Capela?myApiSecret=9b7nn6gu275ssd0db09jj2232ppxxx27
    try {
      const data = await axios.get(`https://weather-webapp-jim4xz2ag-aluisionbr.vercel.app/api/${cityValue}`, {
        params: {
          myApiSecret: '9b7nn6gu275ssd0db09jj2232ppxxx27'
        }
      })
      return await data.data
    } catch (error) {
      return {
        cod: 502,
        msg: "Ocorreu um problema com a conexão com o servidor. Tente novamente mais tarde!"
      }
    }
  }

  function renderInformations(information){
    setCityName(information.city);
    setState(information.state);

    renderCurrentInformations(information.current)
    renderHourlyInformations(information.hourly)
    renderDailyInformations(information.daily)

    setTemperatureVisibility(true);
  }

  function renderCurrentInformations(information){
    setCurrentWeatherIcon(information.icon);
    setCurrentTemperatureValue(information.temp);
    setCurrentWeatherDescription(information.description);
    setCurrentFeels_likeValue(information.feels_like);
    setCurrentHumidityValue(information.humidity);
    setCurrentUviValue(information.uvi)
    setAmountOfRain(information.rain)
    setAmountOfSnow(information.snow)
  }

  function renderHourlyInformations(informations){
    const content = []
    for(let hour of informations){
      content.push({
        hour: hour.hour,
        temp: hour.temp,
        feels_like: hour.feels_like,
        uvi: hour.uvi,
        humidity: hour.humidity,
        description: hour.description,
        icon: hour.icon,
        pop: hour.pop,
        rain: {
          rainy: hour.rain.rainy,
          rain: hour.rain.rain
        },
        snow: {
          snowed: hour.snow.snowed,
          snow: hour.snow.snow
        }
      })
    }
    setTemperatureForHour(content)
  }

  function renderDailyInformations(informations){
    const content = []
    for(let day of informations){
      content.push({
        moon_phase: day.moon_phase,
        temp: {
          morn: day.temp.morn,
          day: day.temp.day,
          eve: day.temp.eve,
          night: day.temp.night,
          min: day.temp.min,
          max: day.temp.max
        },
        feels_like: {
          morn: day.feels_like.morn,
          day: day.feels_like.day,
          eve: day.feels_like.eve,
          night: day.feels_like.night
        },
        uvi: day.uvi,
        humidity: day.humidity,
        description: day.description,
        icon: day.icon,
        pop: day.pop,
        rain: {
          rainy: day.rain.rainy,
          rain: day.rain.rain
        },
        snow: {
          snowed: day.snow.snowed,
          snow: day.snow.snow
        }
      })
    }
    setTemperatureForDay(content)
  }

  function renderErr(msg){
    setMsgValue(msg);
    setTemperatureVisibility(false);
  }

  function verifyResponse(information){
    if (information.cod === 200)
      renderInformations(information)
    else
      renderErr(information.msg)
  }

  async function submitCityVerifyResponseAndRenderInformations(cityValue) {
    const information = await fetchWeatherInformation(cityValue);
    verifyResponse(information)
    return "";
  }

  return (
    <View>
      <View style={[styles.formCity, { fontFamily: 'Poppins' }]}>
        <View>
          <Text style={{ color: '#fdfdfd', fontSize: 20, fontFamily: 'Poppins' }}>
            Informe sua cidade:
          </Text>
        </View>

        <TextInput
          style={[styles.formCityButtonInput, { fontFamily: 'Poppins' }]}
          defaultValue={cityValue}
          onChangeText={newText => setCityValue(newText)}
        />

        <SubmitButton
          setCityValue={setCityValue}
          submitCity={submitCityVerifyResponseAndRenderInformations}
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
      onPress={() => setCityValue(submitCity(cityValue))}
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
