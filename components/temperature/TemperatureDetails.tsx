import styles from "../../styles/components/temperature/TemperatureDetails.module.css";
import { AdditionalInformations } from './AdditionalInformations'

interface TemperatureDetailsProps{
  feels_like: number;
  humidity: number
}

function TemperatureDetails(props: TemperatureDetailsProps) {
  return (
    <div id={styles.temperatureDetails}>
      <div className={styles.containerDetails}>
        <AdditionalInformations value={`${props.feels_like}°C`}>
          Sensação Térmica
        </AdditionalInformations>
      </div>

      <div className={styles.containerDetails}>
        <AdditionalInformations value={`${props.humidity}%`}>Humidade</AdditionalInformations>
      </div>
    </div>
  );
}

export { TemperatureDetails }