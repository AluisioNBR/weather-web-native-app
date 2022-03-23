import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from 'axios'

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

  async function fetchWeatherInformation(cityValue) {
    const data = await axios.get(`https://weather-webapp-seven.vercel.app/api/${cityValue}`)
    return await data.data
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
  function verifyResponse(information){
    if (information.cod === 200) renderInformations(information)
    else renderErr(information.msg)
  }
  async function submitCityVerifyResponseAndRenderInformations(event, cityValue) {
    event.preventDefault()
    const information = await fetchWeatherInformation(cityValue);
    verifyResponse(information)
    return "";
  }

  return (
    <div>
      <form
        onSubmit={event => setCityValue(submitCityVerifyResponseAndRenderInformations(event, cityValue))}
        id={styles.formCity}
      >
        <label htmlFor="nameInput">Informe sua cidade:</label><br/>
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
