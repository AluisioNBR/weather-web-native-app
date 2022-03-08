import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useState } from 'react'

function CitySelection({
  setMsgValue,
  setTemperatureVisibility,
  setCityName,
  setCountry,
  setTemperatureValue,
  setWeatherDescription,
  setWeatherIcon,
  setfeels_likeValue,
  setTemperatureMax,
  setTemperatureMin,
  setHumidityValue
}){
  const [cityValue, setCityValue] = useState('')

  async function WeatherInf(){
    const inf = await fetch(`https://weather-webapp-seven.vercel.app/api/${cityValue}`)
    const infJSON = await inf.json()

    return infJSON
  }
  
  async function submitCity(event){
    event.preventDefault()
    const inf = await WeatherInf()

    if(inf.cod == 200){
      setCityName(inf.city)
      setCountry(inf.country)
      setWeatherIcon(inf.icon)
      setTemperatureValue(inf.main.temperature)
      setWeatherDescription(inf.description)

      console.log(inf.main.feels_like)
      setfeels_likeValue(inf.main.feels_like)
      setTemperatureMax(inf.main.temp_max)
      setTemperatureMin(inf.main.temp_min)
      setHumidityValue(inf.main.humidity)

      setTemperatureVisibility(true)
    }

    else {
      setMsgValue(inf.msg)
      setTemperatureVisibility(false)
    }

    return ''
  }

  return(
      <div>
        <form onSubmit={(event) => setCityValue(submitCity(event))} id={styles.formCity}>
          <label htmlFor='nameInput'>
            Informe sua cidade:
          </label><br />
          <input name='nameInput' required defaultValue={cityValue} onChange={(event) => setCityValue(event.target.value)}/>

          <button>
            Selecionar
          </button>
        </form>
      </div>
    )
}

function MainTemperature(props){
  return (
    <div id={styles.MainTemperatureContainer}>
      <div className={styles.MainTemperature}>
      <h2 id={styles.local}>
        {props.city}, {props.country}
      </h2>

      <div>
        <div id={styles.currentTemperature}>
          <img src={props.icon} width='32px' height='32px'/>
          {props.temperature}°C
        </div>

        <div id={styles.weatherDescription}>
          {props.description}
        </div>
      </div>
    </div>
    </div>
  )
}

function TemperatureDetails(props){
  return(
    <div id={styles.temperatureDetails}>
      <div className={styles.containerDetails}>
        <h3>
          Sensação Térmica
        </h3>

        <div className={styles.categoryValue}>
          {props.feels_like}°C
        </div>
      </div>

      <div className={styles.containerDetails} id={styles.minMax}>
        <div>
          <h3>
            Max:
          </h3>

          <div className={styles.categoryValue}>
            {props.temp_max}°C
          </div>
        </div>
        
        <div>
          <h3>
            Min:
          </h3>

          <div className={styles.categoryValue}>
            {props.temp_min}°C
          </div>
        </div>
      </div>

      <div className={styles.containerDetails}>
        <h3>
          Humidade  
        </h3>

        <div className={styles.categoryValue}>
          {props.humidity}%
        </div>
      </div>
    </div>
  )
}

function Temperature(props){
  if(props.visibility) return(
    <div id={styles.temperatureContainer}>
      <MainTemperature
        city={props.city}
        country={props.country}
        icon={props.icon}
        temperature={props.temperature}
        description={props.description} />

      <TemperatureDetails
        feels_like={props.feels_like}
        temp_max={props.temp_max}
        temp_min={props.temp_min}
        humidity={props.humidity}
      />
    </div>
    )

  else return(
      <div>
        <h2 className={styles.MainTemperature}>
          {props.msg}
        </h2>
      </div>
    )
}

function Home(){
  const [temperatureVisibility, setTemperatureVisibility] = useState(false)

  const [cityName, setCityName] = useState('undefined')
  const [country, setCountry] = useState('undefined')
  const [weatherIcon, setWeatherIcon] = useState('undefined.png')
  const [temperatureValue, setTemperatureValue] = useState(30)
  const [weatherDescription, setWeatherDescription] = useState('undefined')
  
  const [feels_likeValue, setfeels_likeValue] = useState(30)
  const [temperatureMax, setTemperatureMax] = useState(30)
  const [temperatureMin, setTemperatureMin] = useState(30)
  const [humidityValue, setHumidityValue] = useState(0)

  const [msgValue, setMsgValue] = useState('Informe sua cidade para começarmos!')

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather Web App</title>
        <meta name="description" content="App web simples para capturar dados da open weather api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CitySelection
          setMsgValue={setMsgValue}
          setTemperatureVisibility={setTemperatureVisibility}
          setCityName={setCityName}
          setCountry={setCountry}
          setTemperatureValue={setTemperatureValue}
          setWeatherDescription={setWeatherDescription}
          setWeatherIcon={setWeatherIcon}
          setfeels_likeValue={setfeels_likeValue}
          setTemperatureMax={setTemperatureMax}
          setTemperatureMin={setTemperatureMin}
          setHumidityValue={setHumidityValue}
        />
        
        <Temperature
          msg={msgValue}
          city={cityName}
          country={country}
          icon={weatherIcon}
          temperature={temperatureValue}
          description={weatherDescription}
          feels_like={feels_likeValue}
          temp_max={temperatureMax}
          temp_min={temperatureMin}
          humidity={humidityValue}
          visibility={temperatureVisibility}
        />
      </main>
    </div>
  )
}

export default Home
