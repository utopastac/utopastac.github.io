import React, { useContext } from "react";
import ThemeContext from "containers/ThemeContext";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";

export default function Button(props) {
  const { title, onClick, small } = props;

  const theme = useContext(ThemeContext);

  return (
    <div className={`${styles.Main} ${small ? styles.small : ''}`} onClick={onClick} style={{background: theme.light, color: theme.text}}>
      <span>{title}</span>
    </div>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  small: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
