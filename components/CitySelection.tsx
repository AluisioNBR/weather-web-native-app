import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from 'axios'

import type { Dispatch, SetStateAction, FormEvent } from 'react'
import type { FoundDataOfRequest, NotFoundDataOfRequest } from '../pages/api/[city]'
import type { Hourly, Daily } from './api/formatGenericalData'
import type { NoRain, AmountOfRain, NoSnow, AmountOfSnow } from '../pages/index'

interface CitySelectionProps {
  myApiSecret: string,
  setMsgValue: Dispatch<SetStateAction<string>>,
  setTemperatureVisibility: Dispatch<SetStateAction<boolean>>,
  setLoadingWeather: Dispatch<SetStateAction<boolean>>,
  setCityName: Dispatch<SetStateAction<string>>,
  setState: Dispatch<SetStateAction<string>>,
  setCurrentTemperatureValue: Dispatch<SetStateAction<number>>,
  setCurrentWeatherDescription: Dispatch<SetStateAction<string>>,
  setCurrentWeatherIcon: Dispatch<SetStateAction<string>>,
  setCurrentFeels_likeValue: Dispatch<SetStateAction<number>>,
  setCurrentHumidityValue: Dispatch<SetStateAction<number>>,
  setCurrentUviValue: Dispatch<SetStateAction<number>>,
  setAmountOfRain: Dispatch<SetStateAction<NoRain | AmountOfRain>>,
  setAmountOfSnow: Dispatch<SetStateAction<NoSnow | AmountOfSnow>>,
  setTemperatureForHour: Dispatch<SetStateAction<never[]>> | Dispatch<SetStateAction<Hourly>>,
  setTemperatureForDay: Dispatch<SetStateAction<never[]>> | Dispatch<SetStateAction<Daily>>
}

interface ServerError{
  cod: number,
  msg: string
}

function CitySelection({
  myApiSecret,
  setMsgValue,
  setTemperatureVisibility,
  setLoadingWeather,
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
}: CitySelectionProps) {
  const [cityValue, setCityValue] = useState("");

  async function fetchWeatherInformation(cityValue: string) {
    try {
      const data = await axios.get(`/api/${cityValue}`, {
        params: {
          myApiSecret: myApiSecret
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
  function renderInformations(information: FoundDataOfRequest){
    setCityName(information.city);
    setState(information.state);
    setCurrentWeatherIcon(information.current.icon);
    setCurrentTemperatureValue(information.current.temp);
    setCurrentWeatherDescription(information.current.description);
    setCurrentFeels_likeValue(information.current.feels_like);
    setCurrentHumidityValue(information.current.humidity);
    setCurrentUviValue(information.current.uvi)
    setAmountOfRain(information.current.rain)
    setAmountOfSnow(information.current.snow)

    setTemperatureVisibility(true);
  }
  function renderErr(msg: string){
    setMsgValue(msg);
    setTemperatureVisibility(false);
  }
  function verifyResponse(information: FoundDataOfRequest | NotFoundDataOfRequest | ServerError){
    if (information.cod === 200) renderInformations(information as FoundDataOfRequest)
    else {
      const informationToUse = information as ServerError
      renderErr(informationToUse.msg)
    }
  }
  async function submitCityVerifyResponseAndRenderInformations(event: FormEvent<HTMLFormElement>, cityValue: string) {
    event.preventDefault()
    const information: FoundDataOfRequest | NotFoundDataOfRequest | ServerError = await fetchWeatherInformation(cityValue);
    verifyResponse(information)
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          setCityValue("")
          submitCityVerifyResponseAndRenderInformations(event, cityValue)
        }}
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
