import React, { useContext }  from "react";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";
import ThemeContext from "containers/ThemeContext";

export default function Tab(props) {
  const { title, index, active, setActive } = props;

  const theme = useContext(ThemeContext);

  return (
    <div className={`${styles.Main} ${active===index? styles.active : ''}`} onClick={()=>setActive(index)}>
      <h5 style={{borderColor: theme.dark, color: theme.text}}>{title}</h5>
    </div>
  );
}

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired
};
