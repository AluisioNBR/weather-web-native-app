import { useState, useReducer, useCallback } from "react";
import Head from "next/head";
import { GetStaticProps } from 'next'

import styles from "../styles/Home.module.css";

import { AnimatedLoading } from "../components/AnimatedLoading";
import { CitySelection } from "../components/CitySelection";
import { CurrentTemperature } from "../components/CurrentTemperature";
import { HourlyTemperaturesContainer } from "../components/HourlyTemperaturesContainer"

import { weatherInitialValue, weatherReducer } from '../components/submitCity/weatherStateReducer'
import type { APIProps, CurrentWeather, HourWeather, DayWeather } from  '../types/submitCity/weatherStateReducer.types'

function Home(props: APIProps) {
  const [weatherState, weatherDispatch] = useReducer(
    weatherReducer,
    weatherInitialValue
  )

  const setLocalization = useCallback(
    (city: string, state: string) => {
      weatherDispatch({ type: 'city', value: city })
      weatherDispatch({ type: 'state', value: state })
    }, []
  )

  const setCurrentWeather = useCallback(
    (currentWeather: CurrentWeather) => {
      weatherDispatch({ type: 'currentWeather', value: currentWeather })
    }, []
  )

  const setHourlyWeather = useCallback(
    (hourlyWeather: HourWeather[]) => {
      weatherDispatch({ type: 'hourlyWeather', value: hourlyWeather })
    }, []
  )

  const setDailyWeather = useCallback(
    (dailyWeather: DayWeather[]) => {
      weatherDispatch({ type: 'dailyWeather', value: dailyWeather })
    }, []
  )
  
  const [temperatureVisibility, setTemperatureVisibility] = useState(false)
  const [loadingWeather, setLoadingWeather] = useState(false)
  const [msgValue, setMsgValue] = useState(
    "Informe sua cidade para começarmos!"
  )

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
          <link rel="icon" href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
          <CitySelection
            myApiSecret={props.myApiSecret}
            setMsgValue={setMsgValue}
            setTemperatureVisibility={setTemperatureVisibility}
            setLoadingWeather={setLoadingWeather}
            setLocalization={setLocalization}
            setCurrentWeather={setCurrentWeather}
            setHourlyWeather={setHourlyWeather}
            setDailyWeather={setDailyWeather}
          />

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}>
            <CurrentTemperature
              msg={msgValue} visibility={temperatureVisibility}
              loadingWeather={loadingWeather}

              city={weatherState.city} state={weatherState.state}
            >
              {weatherState.currentWeather}
            </CurrentTemperature>

            <HourlyTemperaturesContainer>
              {weatherState.hourlyWeather}
            </HourlyTemperaturesContainer>
          </div>
        </main>
      </div>
    );
}

export default Home;

export const getStaticProps: GetStaticProps = async() => {
  return {
    props:{
      myApiSecret: process.env.MY_API_SECRET
    }
  }
}
