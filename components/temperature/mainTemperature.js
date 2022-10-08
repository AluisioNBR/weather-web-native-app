import styles from "../../styles/Home.module.css";

function MainTemperature(props) {
  return (
    <div id={styles.MainTemperatureContainer}>
      <div className={styles.MainTemperature}>
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

export { MainTemperature }