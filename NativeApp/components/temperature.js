import { styles } from '../styles'
import { Text, View } from 'react-native';

import { MainTemperature } from './temperature/mainTemperature'
import { TemperatureDetails } from './temperature/temperatureDetails'

function Temperature(props) {
  if (props.visibility)
    return (
      <View style={styles.temperatureContainer}>
        <MainTemperature
          city={props.city}
          country={props.country}
          icon={props.icon}
          temperature={String(props.temperature)}
          description={props.description}
        />

        <TemperatureDetails
          feels_like={String(props.feels_like)}
          temp_max={String(props.temp_max)}
          temp_min={String(props.temp_min)}
          humidity={String(props.humidity)}
        />
      </View>
    );

  else
    return (
      <View style={styles.temperatureContainer}>
        <Text style={styles.MainTemperature}>
          {props.msg}
        </Text>
      </View>
    );
}

export { Temperature };
