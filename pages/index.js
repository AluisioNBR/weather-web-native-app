import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState } from 'react'

function CitySelection({ setTemperatureVisibility, setCityName, setCountry, setTemperatureValue, setWeatherDescription }){
  const [cityValue, setCityValue] = useState('')

  async function WeatherInf(){
    const inf = await fetch(`https://weather-webapp-seven.vercel.app/api/${cityValue}`)
    const infJSON = await inf.json()

    return infJSON
  }
  
  async function submitCity(event){
    event.preventDefault()
    const inf = await WeatherInf()

    setCityName(inf.city)
    setCountry(inf.country)
    setTemperatureValue(inf.temperature)
    setWeatherDescription(inf.description)
    setTemperatureVisibility(true)

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
  if(props.visibility) return(
    <div className={styles.MainTemperature}>
      <h2 id={styles.local}>
        {props.city}, {props.country}
      </h2>

      <div>
        <div id={styles.currentTemperature}>
          {props.temperature}°C
        </div>

        <div id={styles.weatherDescription}>
          {props.description}
        </div>
      </div>
    </div>
    )

  else return(
      <div>
        <h2 className={styles.MainTemperature}>
          Informe sua cidade para começarmos!
        </h2>
      </div>
    )
}

function Home(){
  const [temperatureVisibility, setTemperatureVisibility] = useState(false)
  const [cityName, setCityName] = useState('undefined')
  const [country, setCountry] = useState('undefined')
  const [temperatureValue, setTemperatureValue] = useState(30)
  const [weatherDescription, setWeatherDescription] = useState('undefined')

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather Web App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CitySelection setTemperatureVisibility={setTemperatureVisibility} setCityName={setCityName} setCountry={setCountry} setTemperatureValue={setTemperatureValue} setWeatherDescription={setWeatherDescription} />
        <MainTemperature city={cityName} country={country} temperature={temperatureValue} description={weatherDescription} visibility={temperatureVisibility} />
      </main>
    </div>
  )
}

export default Home
