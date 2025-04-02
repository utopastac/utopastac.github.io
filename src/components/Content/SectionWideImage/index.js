import React from "react";
import PropTypes from 'prop-types';
import Image from 'components/Image';
import styles from "./index.module.sass";

export default function SectionWideImage(props) {
  const { img, alt } = props;
  return (
    <figure className={styles.Main}>
      <Image img={img} alt={alt} className={styles.image} />
    </figure>
  );
}

SectionWideImage.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
