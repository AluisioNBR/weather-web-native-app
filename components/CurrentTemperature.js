import styles from "../styles/Home.module.css";
import { MainTemperature } from './temperature/mainTemperature'
import { TemperatureDetails } from './temperature/temperatureDetails'

function CurrentTemperature(props) {
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

function Localization({ city, state }) {
  return(
    <div id={styles.localization}>
      <img
        style={{ width: 32, height: 32 }}
        src="../assets/pin-localization.png"
      />
      
      <h2 id={styles.local}>
        {props.city}, {props.state}
      </h2>
    </div>
  )
}

export { CurrentTemperature };
