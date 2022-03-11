import styles from "../styles/Home.module.css";

function MainTemperature(props) {
  return (
    <div id={styles.MainTemperatureContainer}>
      <div className={styles.MainTemperature}>
        <h2 id={styles.local}>
          {props.city}, {props.country}
        </h2>

        <div>
          <div id={styles.currentTemperature}>
            <img
              src={props.icon}
              alt="Clima Atual"
              width="32px"
              height="32px"
            />
            {props.temperature}°C
          </div>

          <div id={styles.weatherDescription}>{props.description}</div>
        </div>
      </div>
    </div>
  );
}

function AdditionalInf(props) {
  return (
    <div>
      <h3>{props.children}</h3>

      <div className={styles.categoryValue}>{props.value}</div>
    </div>
  );
}

function TemperatureDetails(props) {
  return (
    <div id={styles.temperatureDetails}>
      <div className={styles.containerDetails}>
        <AdditionalInf value={`${props.feels_like}°C`}>
          Sensação Térmica
        </AdditionalInf>
      </div>

      <div className={styles.containerDetails} id={styles.minMax}>
        <AdditionalInf value={`${props.temp_max}°C`}>Max:</AdditionalInf>

        <AdditionalInf value={`${props.temp_min}°C`}>Min:</AdditionalInf>
      </div>

      <div className={styles.containerDetails}>
        <AdditionalInf value={`${props.humidity}%`}>Humidade</AdditionalInf>
      </div>
    </div>
  );
}

function Temperature(props) {
  if (props.visibility)
    return (
      <div id={styles.temperatureContainer}>
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
      </div>
    );
  else
    return (
      <div>
        <h2 className={styles.MainTemperature}>{props.msg}</h2>
      </div>
    );
}

export { Temperature };
