import React from "react";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";

export default function Image(props) {
  const { img, alt, className } = props;
  return (
    <div className={`${styles.Main} ${className}`}>
      <img src={img} alt={alt} />
    </div>
  );
}

Image.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.object
};
