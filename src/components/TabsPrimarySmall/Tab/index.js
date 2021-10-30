import React from "react";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";

export default function Tab(props) {
  const { title, stuck, path, active, setActive } = props;
  return (
    <div
      className={`${styles.Main} ${active===path? styles.active : ''} ${stuck ? styles.stuck : ''}`}
      onClick={()=>setActive(path)}>
      <span>{title}</span>
    </div>
  );
}

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
  stuck: PropTypes.bool
};
