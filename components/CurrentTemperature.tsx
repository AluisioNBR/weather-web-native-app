import styles from "../styles/components/CurrentTemperature.module.css";

import { MainTemperature } from './temperature/MainTemperature'
import { TemperatureDetails } from './temperature/TemperatureDetails'

import Image from "next/image"

import type { NoRain, AmountOfRain, NoSnow, AmountOfSnow } from '../pages/index'

import PinImage from "../assets/pin-localization.png";

interface CurrentTemperatureProps{
  msg: string,
  city: string,
  state: string,
  icon: string,
  temperature: number,
  description: string,
  feels_like: number,
  humidity: number,
  uvi: number,
  rain: NoRain | AmountOfRain,
  snow: NoSnow | AmountOfSnow,
  visibility: boolean,
  loadingWeather: boolean
}

function CurrentTemperature(props: CurrentTemperatureProps) {
  if (props.visibility)
    return (
      <div id={styles.temperatureContainer}>
        <Localization
          city={props.city}
          state={props.state}
        />

        <MainTemperature
          icon={props.icon}
          temperature={props.temperature}
          feels_like={props.feels_like}
          description={props.description}
        />

        <TemperatureDetails
          humidity={props.humidity}
          uvi={props.uvi}
          rain={props.rain}
          snow={props.snow}
        />
      </div>
    );
  else
    return (
      <div>
        <h2 className={styles.MainTemperature}>{props.msg}</h2>
      </div>
    );
}

interface LocalizationProps{
  city: string,
  state: string
}

function Localization({ city, state }: LocalizationProps) {
  return(
    <div id={styles.localization}>
      <Image
        width='32'
        height='32'
        src={PinImage}
        alt='Pin de Localização'
      />
      
      <h2 id={styles.local}>
        {city}, {state}
      </h2>
    </div>
  )
}

export { CurrentTemperature };
