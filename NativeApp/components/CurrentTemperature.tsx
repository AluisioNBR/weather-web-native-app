import { Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';

import { MainTemperature } from './temperature/MainTemperature'
import { TemperatureDetails } from './temperature/TemperatureDetails'
import { colors } from './colors';

import type { NoRain, NoSnow, AmountOfRain, AmountOfSnow } from '../App'

interface CurrentTemperatureProps{
  msg: string,
  city: string,
  state: string,
  icon: string,
  temperature: number,
  description: string,
  feels_like: number,
  humidity: number,
  uvi: number,
  rain: NoRain | AmountOfRain,
  snow: NoSnow | AmountOfSnow,
  visibility: boolean,
  loadingWeather: boolean
}

function CurrentTemperature(props: CurrentTemperatureProps) {
  const [loaded] = useFonts({
    'Poppins': require('../assets/Poppins/Poppins-Regular.ttf'),
  })

  if(props.visibility)
    return (
      <View style={{
        margin: 16,
        alignItems: 'center'
      }}>
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
      <View style={{
        margin: 16,
        alignItems: 'center'
      }}>
        <Text style={{
          color: colors.mainWhite,
          fontSize: 22,
          textAlign: 'center',
          fontFamily: 'Poppins'
        }}>
          {props.msg}
        </Text>
      </View>
    );
}

interface LocalizationProps{
  city: string,
  state: string
}

function Localization(props: LocalizationProps){
  const [loaded] = useFonts({
    'Poppins': require('../assets/Poppins/Poppins-Regular.ttf'),
  })
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row'}}>
      <Image
        style={{ width: 32, height: 32 }}
        source={require("../assets/pin-localization.png")}
      />

      <Text style={{
        fontFamily: 'Poppins',
        textAlign: 'center',
        color: colors.mainWhite,
        fontSize: 22
      }}>
        {props.city}, {props.state}
      </Text>
    </View>
  )
}

export { CurrentTemperature };