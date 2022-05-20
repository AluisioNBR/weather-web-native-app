import styles from "../../styles/components/temperature/MainTemperature.module.css";

interface MainTemperatureProps{
  icon: string;
  temperature: number;
  feels_like: number;
  description: string
}

function MainTemperature(props: MainTemperatureProps) {
  return (
    <div id={styles.MainTemperatureContainer}>
      <div className={styles.MainTemperature}>
        <div id={styles.weatherDescription}>
          <img
            src={props.icon}
            alt="Clima Atual"
            style={{ width:"48px", height:"48px" }}
          />
          <span>
            {props.description}
          </span>
        </div>

        <p id={styles.currentTemperature}>
          {props.temperature}°C
        </p>

        <p id={styles.feels_like}>
          Sensação Térmica: {props.feels_like}°C
        </p>
      </div>
    </div>
  );
}

export { MainTemperature }
