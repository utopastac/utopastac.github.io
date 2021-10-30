import React from "react";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";

export default function TextButton(props) {
  const { title, onClick, small } = props;

  return (
    <div className={`${styles.Main} ${small ? styles.small : ''}`} onClick={onClick}>
      <span>{title}</span>
    </div>
  );
}

TextButton.propTypes = {
  title: PropTypes.string.isRequired,
  small: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
