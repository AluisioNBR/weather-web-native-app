import { styles } from '../App'
import { useState } from "react";
import { Text, View, Button, TextInput } from 'react-native';

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

  async function WeatherInformation(cityValue) {
    const information = await fetch(
      `https://weather-webapp-seven.vercel.app/api/${cityValue}`
    );
    const informationJSON = await information.json();

    return informationJSON;
  }

  function renderInformations(information){
    setCityName(information.city);
    setCountry(information.country);
    setWeatherIcon(information.icon);
    setTemperatureValue(information.temperature);
    setWeatherDescription(information.description);

    setfeels_likeValue(information.main.feels_like);
    setTemperatureMax(information.main.temp_max);
    setTemperatureMin(information.main.temp_min);
    setHumidityValue(information.main.humidity);

    setTemperatureVisibility(true);
  }

  function renderErr(msg){
    setMsgValue(msg);
    setTemperatureVisibility(false);
  }

  async function submitCityAndRenderInformations(cityValue) {
    const information = await WeatherInformation(cityValue);

    if (information.cod === 200) renderInformations(information)
    
    else renderErr(information.msg)

    return "";
  }

  return (
    <View>
      <View style={styles.formCity}>
        <View>
          <Text style={{ color: '#fdfdfd', fontSize: 20 }}>
            Informe sua cidade:
          </Text>
        </View>

        <TextInput
          style={styles.formCityButtonInput}
          defaultValue={cityValue}
          onChangeText={newText => setCityValue(newText)}
        />

        <Button
          title='Selecionar'
          color='gray'
          onPress={() => setCityValue(submitCityAndRenderInformations(cityValue))}  
        />
      </View>
    </View>
  );
}

export { CitySelection };
