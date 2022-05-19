import { useState } from "react";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

import styles from "../styles/Home.module.css";

import { AnimatedLoading } from "../components/AnimatedLoading";
import { CitySelection } from "../components/CitySelection";
import { CurrentTemperature } from "../components/CurrentTemperature";

import type { Hourly, Daily } from '../components/api/formatGenericalData'
import type { Dispatch, SetStateAction } from 'react'

interface APIProps{
  myApiSecret: string;
}

interface NoRain{ rainy: string }

interface AmountOfRain{ rainy: string, rain: number }

interface NoSnow{ snowed: string }

interface AmountOfSnow{ snowed: string, snow: number }

interface CurrentWeather{
  temp: number;
  feels_like: number;
  uvi: number;
  humidity: number;
  description: string;
  icon: string;
  rain: NoRain | AmountOfRain;
  snow: NoSnow | AmountOfSnow
;
}

interface HourWeather{
  hour: string;
  temp: number;
  feels_like: number;
  uvi: number;
  humidity: number;
  description: string;
  icon: string;
  pop: number;
  rain: NoRain | AmountOfRain;
  snow: NoSnow | AmountOfSnow
}

interface DayWeather{
  moon_phase: string;
  temp: {
      morn: number;
      day: number;
      eve: number;
      night: number;
      min: number;
      max: number;
  };
  feels_like: {
      morn: number;
      day: number;
      eve: number;
      night: number;
  };
  uvi: number;
  humidity: number;
  description: string;
  icon: string;
  pop: number;
  rain: NoRain | AmountOfRain;
  snow: NoSnow | AmountOfSnow;
}

function Home(props: APIProps) {
  const [temperatureVisibility, setTemperatureVisibility] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false)

  const [cityName, setCityName] = useState("undefined");
  const [state, setState] = useState("undefined");

  const [currentWeatherIcon, setCurrentWeatherIcon] = useState("undefined.png");
  const [currentTemperatureValue, setCurrentTemperatureValue] = useState(30);
  const [currentWeatherDescription, setCurrentWeatherDescription] = useState("undefined");
  const [currentFeels_likeValue, setCurrentFeels_likeValue] = useState(30);
  const [currentHumidityValue, setCurrentHumidityValue] = useState(0);
  const [currentUviValue, setCurrentUviValue] = useState(0)
  const [amountOfRain, setAmountOfRain]: [
    NoRain | AmountOfRain,
    Dispatch<SetStateAction<NoRain | AmountOfRain>>
  ] = useState({ rainy: 'no-rain' })
  const [amountOfSnow, setAmountOfSnow]: [
    NoSnow | AmountOfSnow,
    Dispatch<SetStateAction<NoSnow | AmountOfSnow>>
  ] = useState({ snowed: 'no-snow' })

  const [temperatureForHour, setTemperatureForHour]: [
    never[] | Hourly,
    Dispatch<SetStateAction<never[]>> | Dispatch<SetStateAction<Hourly>>
  ] = useState([])
  const [temperatureForDay, setTemperatureForDay]: [
    never[] | Daily,
    Dispatch<SetStateAction<never[]>> | Dispatch<SetStateAction<Hourly>>
  ] = useState([])

  const [msgValue, setMsgValue] = useState(
    "Informe sua cidade para começarmos!"
  );

  if(loadingWeather)
    return <AnimatedLoading/>
  else
    return (
      <div className={styles.container}>
        <Head>
          <title>Weather Web App</title>
          <meta
            name="description"
            content="App web simples para consumir os dados da API do Open Weather Map"
          />
          <link rel="icon" href="../assets/favicon.png" />
        </Head>

        <main className={styles.main}>
          <CitySelection
            myApiSecret={props.myApiSecret}
            setMsgValue={setMsgValue}
            setTemperatureVisibility={setTemperatureVisibility}
            setLoadingWeather={setLoadingWeather}
            setCityName={setCityName}
            setState={setState}
            setCurrentTemperatureValue={setCurrentTemperatureValue}
            setCurrentWeatherDescription={setCurrentWeatherDescription}
            setCurrentWeatherIcon={setCurrentWeatherIcon}
            setCurrentFeels_likeValue={setCurrentFeels_likeValue}
            setCurrentHumidityValue={setCurrentHumidityValue}
            setCurrentUviValue={setCurrentUviValue}
            setAmountOfRain={setAmountOfRain}
            setAmountOfSnow={setAmountOfSnow}
            setTemperatureForHour={setTemperatureForHour}
            setTemperatureForDay={setTemperatureForDay}
          />

          <CurrentTemperature
            msg={msgValue}
            city={cityName}
            state={state}
            icon={currentWeatherIcon}
            temperature={currentTemperatureValue}
            description={currentWeatherDescription}
            feels_like={currentFeels_likeValue}
            humidity={currentHumidityValue}
            uvi={currentUviValue}
            rain={amountOfRain}
            snow={amountOfSnow}
            visibility={temperatureVisibility}
            loadingWeather={loadingWeather}
          />
        </main>
      </div>
    );
}

export default Home;

export type { NoRain, NoSnow, AmountOfRain, AmountOfSnow, CurrentWeather, HourWeather, DayWeather }

export const getStaticProps: GetStaticProps = async() => {
  return {
    props:{
      myApiSecret: process.env.MY_API_SECRET
    }
  }
}
