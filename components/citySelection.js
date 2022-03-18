import styles from "../styles/Home.module.css";
import { useState } from "react";

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

  async function submitCity(event, cityValue) {
    event.preventDefault();
    const inf = await WeatherInf(cityValue);
    console.log(inf);

    if (inf.cod === 200) {
      setCityName(inf.city);
      setCountry(inf.country);
      setWeatherIcon(inf.icon);
      setTemperatureValue(inf.temperature);
      setWeatherDescription(inf.description);

      console.log(inf.main.feels_like);
      setfeels_likeValue(inf.main.feels_like);
      setTemperatureMax(inf.main.temp_max);
      setTemperatureMin(inf.main.temp_min);
      setHumidityValue(inf.main.humidity);

      setTemperatureVisibility(true);
    } else {
      setMsgValue(inf.msg);
      setTemperatureVisibility(false);
    }

    return "";
  }

  return (
    <div>
      <form
        onSubmit={(event) => setCityValue(submitCity(event, cityValue))}
        id={styles.formCity}
      >
        <label htmlFor="nameInput">Informe sua cidade:</label>
        <br />
        <input
          name="nameInput"
          required
          defaultValue={cityValue}
          onChange={(event) => setCityValue(event.target.value)}
        />

        <button>Selecionar</button>
      </form>
    </div>
  );
}

export { CitySelection };
