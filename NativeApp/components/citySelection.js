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

export { CitySelection };
