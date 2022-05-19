import styles from "../../styles/components/temperature/MainTemperature.module.css";

interface MainTemperatureProps{
  icon: string;
  temperature: number;
  description: string
}

function MainTemperature(props: MainTemperatureProps) {
  return (
    <div id={styles.MainTemperatureContainer}>
      <div className={styles.MainTemperature}>
        <div>
          <div id={styles.currentTemperature}>
            <img
              src={props.icon}
              alt="Clima Atual"
              style={{ width:"48px", height:"48px" }}
            />
            <span>
              {props.temperature}°C
            </span>
          </div>

          <p id={styles.weatherDescription}>
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export { MainTemperature }
