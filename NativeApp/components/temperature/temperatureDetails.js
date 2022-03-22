import { styles } from '../../styles'
import { View } from 'react-native';

import { AdditionalInf } from './additionalInf'
  
function TemperatureDetails(props) {
    return (
      <View style={styles.temperatureDetails}>
        <View style={styles.containerDetails}>
          <AdditionalInf value={`${props.feels_like}°C`}>
            Sensação Térmica
          </AdditionalInf>
        </View>
  
        <View style={[styles.containerDetails, styles.minMax]}>
          <AdditionalInf MinOrMax={true} value={`${props.temp_max}°C`}>
            Max:
          </AdditionalInf>
  
          <AdditionalInf MinOrMax={true} value={`${props.temp_min}°C`}>
            Min:
          </AdditionalInf>
        </View>
  
        <View style={styles.containerDetails}>
          <AdditionalInf value={`${props.humidity}%`}>
            Humidade
          </AdditionalInf>
        </View>
      </View>
    );
}

export { TemperatureDetails }