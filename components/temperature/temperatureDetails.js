import styles from "../../styles/Home.module.css";
import { AdditionalInformations } from './additionalInformations'
  
function TemperatureDetails(props) {
  return (
    <div id={styles.temperatureDetails}>
      <div className={styles.containerDetails}>
        <AdditionalInformations value={`${props.feels_like}°C`}>
          Sensação Térmica
        </AdditionalInformations>
      </div>

      <div className={styles.containerDetails} id={styles.minMax}>
        <AdditionalInformations value={`${props.temp_max}°C`}>Max:</AdditionalInformations>

        <AdditionalInformations value={`${props.temp_min}°C`}>Min:</AdditionalInformations>
      </div>

      <div className={styles.containerDetails}>
        <AdditionalInformations value={`${props.humidity}%`}>Humidade</AdditionalInformations>
      </div>
    </div>
  );
}

export { TemperatureDetails }