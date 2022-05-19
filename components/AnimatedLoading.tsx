import React from 'react';
import styles from "../styles/components/AnimatedLoading.module.css";

export function AnimatedLoading(){
  return (
    <div id={styles.AnimatedLoadingContainer}>
      <p>
        Carregando...
      </p>

      <LoadingBar />
    </div>
  )
}

function LoadingBar() {
  return (
    <div id={styles.LoadingBar}>
        <div id={styles.ColorizedBar}>
          <div></div>
        </div>
      </div>
  )
}