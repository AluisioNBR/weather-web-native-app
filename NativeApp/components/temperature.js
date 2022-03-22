import { styles } from '../App'
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

function AdditionalInf(props) {
  if(props.MinOrMax){
    return (
      <View style={styles.MinMaxDiv}>
        <View>
          <Text style={styles.containerDetailsTitle}>
            {props.children}
          </Text>
        </View>

        <View>
          <Text style={styles.categoryValue}>
            {props.value}
          </Text>
        </View>
      </View>
    )
  }
  else return (
      <View>
        <View>
          <Text style={styles.containerDetailsTitle}>
            {props.children}
          </Text>
        </View>

        <View>
          <Text style={styles.categoryValue}>
            {props.value}
          </Text>
        </View>
      </View>
    )
}

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
