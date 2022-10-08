import styles from "../../styles/components/temperature/TemperatureDetails.module.css";
import { AdditionalInformations } from './AdditionalInformations'

import type { NoRain, AmountOfRain, NoSnow, AmountOfSnow } from '../../pages/index'

interface TemperatureDetailsProps{
  uvi: number;
  humidity: number;
  rain: NoRain | AmountOfRain;
  snow: NoSnow | AmountOfSnow
}

function TemperatureDetails({
  uvi,
  humidity,
  rain,
  snow
}: TemperatureDetailsProps) {
  if(rain.rainy === "rain"){
    const rainYes = rain as AmountOfRain
    return (
      <div className={styles.containerDetails}>
        <div id={styles.temperatureDetails}>
          <AdditionalInformations value={`${humidity}%`}>
            Umidade
          </AdditionalInformations>
    
          <AdditionalInformations value={`${uvi}%`}>
            Índice UV
          </AdditionalInformations>
        </div>
        
        <AdditionalInformations value={`${rainYes.rain}mm`}>Chuva</AdditionalInformations>
      </div>
      
    )}
  else if(snow.snowed === "snow"){
    const snowYes = snow as AmountOfSnow
    return (
      <div className={styles.containerDetails}>
        <div id={styles.temperatureDetails}>
          <AdditionalInformations value={`${humidity}%`}>
            Humidade
          </AdditionalInformations>
    
          <AdditionalInformations value={`${uvi}%`}>
            Índice UV
          </AdditionalInformations>

          <div style={{ alignItems: 'center' }}>
            <AdditionalInformations value={`${snowYes.snow}mm`}>Neve</AdditionalInformations>
          </div>
        </div>
      </div>
    )}
  else
    return (
      <div className={styles.containerDetails}>
        <div id={styles.temperatureDetails}>
          <AdditionalInformations value={`${humidity}%`}>
            Umidade
          </AdditionalInformations>

          <AdditionalInformations value={`${uvi}%`}>
            Índice UV
          </AdditionalInformations>
        </div>
      </div>
    )
}

export { TemperatureDetails }