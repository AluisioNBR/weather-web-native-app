import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

import { CitySelection } from "../components/citySelection";
import { Temperature } from "../components/temperature";

function Home() {
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
    <div className={styles.container}>
      <Head>
        <title>Weather Web App</title>
        <meta
          name="description"
          content="App web simples para capturar dados da open weather api"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
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
      </main>
    </div>
  );
}

export default Home;
