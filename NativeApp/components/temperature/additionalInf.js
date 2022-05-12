import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { colors } from '../colors';

function AdditionalInf(props) {
  const [loaded] = useFonts({
    'Poppins': require('../../assets/Poppins/Poppins-Regular.ttf'),
  })
  return (
    <Text style={{
      fontSize: 14,
      color: colors.mainWhite,
      marginLeft: 8,
      marginRight: 8,
      fontFamily: 'Poppins'
    }}>
      {props.children}: {props.value}
    </Text>
  )
}

export { AdditionalInf }