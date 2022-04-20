import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';

function AdditionalInf(props) {
  const [loaded] = useFonts({
    'Poppins': require('../../assets/Poppins/Poppins-Regular.ttf'),
  })
  return (
    <Text style={{
      fontSize: 14,
      color: '#fdfdfd',
      marginLeft: 8,
      marginRight: 8,
      fontFamily: 'Poppins'
    }}>
      {props.children}: {props.value}
    </Text>
  )
}

export { AdditionalInf }