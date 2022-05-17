import styles from "../../styles/Home.module.css";

interface AdditionalInformationsProps{
  children: string;
  value: string
}

function AdditionalInformations(props: AdditionalInformationsProps) {
  return (
    <div>
      <h3>{props.children}</h3>

      <div className={styles.categoryValue}>{props.value}</div>
    </div>
  );
}

export { AdditionalInformations }