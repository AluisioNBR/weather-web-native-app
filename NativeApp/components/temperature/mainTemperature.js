import { Text, View, Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { colors } from '../colors';

const styles = StyleSheet.create({
  MainTemperature: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 190,
    height: 150,
    borderRadius: 24,
    
    color: colors.mainWhite,
    fontSize: 20,

    textAlign: 'center'
  },

  MainTemperatureContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16
  },

  
  currentTemperatureText: {
    fontSize: 54,
    color: colors.mainWhite
  },
  
  currentDescription: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  weatherDescription: {
    fontSize: 20,
    color: colors.mainWhite,
    alignItems: 'center',
  },

  currentFeelsLike:{
    fontSize: 14,
    color: colors.gray1
  }
})

function MainTemperature({
  icon,
  temperature,
  feels_like,
  description
}) {
  const [loaded] = useFonts({
    'Poppins': require('../../assets/Poppins/Poppins-Regular.ttf'),
  })
    return (
      <View style={styles.MainTemperatureContainer}>
        <View style={styles.MainTemperature}>
          <View style={styles.currentDescription}>
            <Image
              source={{uri: icon}}
              style={{ width: 32, height: 32}}
            />

            <Text style={[styles.weatherDescription, { fontFamily: 'Poppins' }]}>
              {description}
            </Text>
          </View>

          <View>
            <Text style={[styles.currentTemperatureText, { fontFamily: 'Poppins' }]}>
              {`${temperature}`}°C
            </Text>
          </View>

          <View>
            <Text style={[styles.currentFeelsLike, { fontFamily: 'Poppins' }]}>
              {`Sensação Térmica: ${feels_like}`}°C
            </Text>
          </View>
        </View>
      </View>
    );
}

export { MainTemperature }