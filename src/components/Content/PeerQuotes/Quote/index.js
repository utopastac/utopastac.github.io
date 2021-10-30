import React from "react";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";

export default function Quote(props) {
  
  const {content, attribution} = props;
  
  return (
    <div className={styles.Main}>
      <p>{content}</p>
      <h5>{attribution}</h5>
      <div className={styles.block}></div>
    </div>
  );
}

Quote.propTypes = {
  content: PropTypes.string.isRequired,
  attribution: PropTypes.string.isRequired,
};
