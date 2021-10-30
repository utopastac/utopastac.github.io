import React from "react";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";

export default function MenuButton(props) {
  const {setActive} = props;
  return (
    <div className={styles.Main} onClick={()=>setActive(true)}></div>
  );
}

MenuButton.propTypes = {
  setActive: PropTypes.func,
};
