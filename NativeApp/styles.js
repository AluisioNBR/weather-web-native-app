import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },

  main: {
    paddingTop: 32,
    flex: 1
  },

  citySelection: {
    flex: 1
  },

  temperatureContainer: {
    flex: 4,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },

  formCity:{
    color: '#fdfdfd',
    fontSize: 20,
    alignItems: 'center'
  },

  formCityButtonInput:{
    fontSize: 20,
    padding: 8,
    backgroundColor: '#fdfdfd',
    width: 300
  },

  MainTemperatureContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    flex: 1
  },

  MainTemperature: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 240,
    height: 240,
    padding: 24,
    borderRadius: 24,
    
    backgroundColor: '#0C42FF',
    color: '#fdfdfd',
    fontSize: 20,

    textAlign: 'center'
  },

  local:{
    textAlign: 'center',
    color: '#fdfdfd',
    fontSize: 22
  },

  currentTemperature: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  currentTemperatureText: {
    fontSize: 22,
    color: '#fdfdfd'
  },

  weatherDescription: {
    fontSize: 22,
    color: '#fdfdfd',
    alignItems: 'center',
  },

  temperatureDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',

    flex: 3,
  },

  containerDetails: {
    width: 160,
    height: 160,

    padding: 24,
    borderRadius: 16,
    margin: 16,

    backgroundColor: '#F216AA',
    color: '#fdfdfd',
    justifyContent: 'center'
  },

  containerDetailsTitle: {
    fontSize: 22,
    textAlign: 'center',
    color: '#fdfdfd'
  },

  MinMaxDiv: {
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },

  categoryValue:{
    fontSize: 22,
    textAlign: 'center',
    color: '#fdfdfd'
  }
});
  
export { styles }