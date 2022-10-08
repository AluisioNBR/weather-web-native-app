import styles from "../../styles/Home.module.css";

function AdditionalInformations(props) {
  return (
    <div>
      <h3>{props.children}</h3>

      <div className={styles.categoryValue}>{props.value}</div>
    </div>
  );
}

export { AdditionalInformations }