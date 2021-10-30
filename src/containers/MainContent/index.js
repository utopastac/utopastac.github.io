import React from "react";
import styles from "./index.module.sass";

export default function MainContent(props) {
  return (
    <div className={styles.Main}>
      {props.children}
    </div>
  );
}
