import { styles } from '../../styles'
import { Text, View } from 'react-native';

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

export { AdditionalInf }