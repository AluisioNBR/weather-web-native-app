import { Text, View, Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

import { MainTemperature } from './temperature/mainTemperature'
import { TemperatureDetails } from './temperature/temperatureDetails'

function Localization(props){
  const [loaded] = useFonts({
    'Poppins': require('../assets/Poppins/Poppins-Regular.ttf'),
  })
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row'}}>
      <Image
        style={{ width: 32, height: 32 }}
        source={require("../assets/pin-localization.png")}
      />

      <Text style={[styles.local, { fontFamily: 'Poppins' }]}>
        {props.city}, {props.state}
      </Text>
    </View>
  )
}

function CurrentTemperature(props) {
  const [loaded] = useFonts({
    'Poppins': require('../assets/Poppins/Poppins-Regular.ttf'),
  })
  if (props.visibility)
    return (
      <View style={styles.temperatureContainer}>
        <Localization
          city={props.city}
          state={props.state}
        />

        <MainTemperature
          icon={props.icon}
          temperature={String(props.temperature)}
          feels_like={String(props.feels_like)}
          description={props.description}
        />

        <TemperatureDetails
          humidity={String(props.humidity)}
          uvi={String(props.uvi)}
          rain={props.rain}
          snow={props.snow}
        />
      </View>
    );

  else
    return (
      <View style={styles.temperatureContainer}>
        <Text style={{
          color: '#fdfdfd',
          fontSize: 22,
          textAlign: 'center',
          fontFamily: 'Poppins'
        }}>
          {props.msg}
        </Text>
      </View>
    );
}

export { CurrentTemperature };

const styles = StyleSheet.create({
  temperatureContainer: {
    margin: 16,
    alignItems: 'center'
  },

  MainTemperature: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 240,
    height: 240,
    padding: 24,
    
    color: '#fdfdfd',
    fontSize: 20,

    textAlign: 'center'
  },

  local:{
    textAlign: 'center',
    color: '#fdfdfd',
    fontSize: 22
  }
})