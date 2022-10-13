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

import { Box, Stack, useMediaQuery } from "@chakra-ui/react";
import { AppColors } from "../styles/AppColors";

function Home(props: APIProps) {
  const [isLowerThan720] = useMediaQuery('(max-width: 720px)')

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
      <Box h='100vh' bg={AppColors.MainBlack} overflow='auto'>
        <Head>
          <title>Weather Web App</title>
          <meta
            name="description"
            content="App web simples para consumir os dados da API do Open Weather Map"
          />
          <link rel="icon" href='/favicon.ico' />
        </Head>

        <Stack as='main' align='center' gap='0.8rem' p='1rem 0'>
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

          <Stack direction={isLowerThan720 ? 'column': 'row'} align='center' justify='space-evenly'>
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
          </Stack>
        </Stack>
      </Box>
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
