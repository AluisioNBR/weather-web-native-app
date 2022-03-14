import { styles } from '../App'
import { Text, View, Image } from 'react-native';

function MainTemperature(props) {
  return (
    <View style={styles.MainTemperatureContainer}>
      <View style={styles.MainTemperature}>
        <Text style={styles.local}>
          {props.city}, {props.country}
        </Text>

        <View>
          <View style={styles.currentTemperature}>
            <Image
              source={{uri: props.icon}}
              style={{ width: 32, height: 32}}
            />
            <Text>
              {props.temperature}°C
            </Text>
          </View>

          <View style={styles.weatherDescription}>{props.description}</View>
        </View>
      </View>
    </View>
  );
}

function AdditionalInf(props) {
  if(props.MinOrMax){
    return (
      <View style={styles.MinMaxDiv}>
        <Text style={styles.containerDetailsTitle}>{props.children}</Text>

        <View style={styles.categoryValue}>{props.value}</View>
      </View>
    )
  }
  else return (
      <View>
        <Text style={styles.containerDetailsTitle}>{props.children}</Text>

        <View style={styles.categoryValue}>{props.value}</View>
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

      <View style={styles.containerDetails} style={styles.minMax}>
        <AdditionalInf MinOrMax={true} value={`${props.temp_max}°C`}>Max:</AdditionalInf>

        <AdditionalInf MinOrMax={true} value={`${props.temp_min}°C`}>Min:</AdditionalInf>
      </View>

      <View style={styles.containerDetails}>
        <AdditionalInf value={`${props.humidity}%`}>Humidade</AdditionalInf>
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
          temperature={props.temperature}
          description={props.description}
        />

        <TemperatureDetails
          feels_like={props.feels_like}
          temp_max={props.temp_max}
          temp_min={props.temp_min}
          humidity={props.humidity}
        />
      </View>
    );
  else
    return (
      <View>
        <Text style={styles.MainTemperature}>{props.msg}</Text>
      </View>
    );
}

export { Temperature };
