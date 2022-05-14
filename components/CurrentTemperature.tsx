import styles from "../styles/Home.module.css";
import { MainTemperature } from './temperature/mainTemperature'
import { TemperatureDetails } from './temperature/temperatureDetails'
import Image from "next/image"

interface CurrentTemperatureProps{
  msg: string,
  city: string,
  state: string,
  icon: string,
  temperature: number,
  description: string,
  feels_like: number,
  temp_max: number,
  temp_min: number,
  humidity: number,
  visibility: boolean
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
          description={props.description}
        />

        <TemperatureDetails
          feels_like={props.feels_like}
          temp_max={props.temp_max}
          temp_min={props.temp_min}
          humidity={props.humidity}
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
        src="../assets/pin-localization.png"
        alt='Pin de Localização'
      />
      
      <h2 id={styles.local}>
        {city}, {state}
      </h2>
    </div>
  )
}

export { CurrentTemperature };
