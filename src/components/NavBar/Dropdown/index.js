import React, { useContext } from "react";
import ThemeContext from "containers/ThemeContext";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";

export default function Dropdown(props) {
  const { setDropdownActive, component, stuck } = props;

  const theme = useContext(ThemeContext);

  return (
    <div
      className={`${styles.Main} ${stuck ? styles.active : ''}`}
      onMouseEnter={()=>setDropdownActive(true)}
      onMouseLeave={()=>setDropdownActive(false)}
    >
      <ul>{component}</ul>
    </div>
  );
}

Dropdown.propTypes = {
  setDropdownActive: PropTypes.func.isRequired,
  component: PropTypes.array.isRequired,
  stuck: PropTypes.bool.isRequired,
};
