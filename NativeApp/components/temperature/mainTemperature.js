import { styles } from '../../styles'
import { Text, View, Image } from 'react-native';

function MainTemperature(props) {
    return (
      <View style={styles.MainTemperatureContainer}>
        <View style={styles.MainTemperature}>
          <Text style={styles.local}>
            {`${props.city}`}, {`${props.country}`}
          </Text>
  
          <View>
            <View style={styles.currentTemperature}>
              <Image
                source={{uri: props.icon}}
                style={{ width: 32, height: 32}}
              />
              <Text style={styles.currentTemperatureText}>
                {`${props.temperature}`}°C
              </Text>
            </View>
  
            <View>
              <Text style={styles.weatherDescription}>
                {props.description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
}

export { MainTemperature }