import styles from "../styles/Home.module.css";
import { MainTemperature } from './temperature/mainTemperature'
import { TemperatureDetails } from './temperature/temperatureDetails'

function Temperature(props) {
  if (props.visibility)
    return (
      <div id={styles.temperatureContainer}>
        <MainTemperature
          city={props.city}
          country={props.country}
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

export { Temperature };
