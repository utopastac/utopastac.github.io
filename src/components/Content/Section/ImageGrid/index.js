import React from "react";
import PropTypes from 'prop-types';
import Image from 'components/Image';
import styles from "./index.module.sass";

export default function ImageGrid(props) {
  const { img, alt } = props;
  
  const images = img.map((image, index)=>{
    return (
      <div className={styles.image}>
        <Image img={image} alt={`${alt}-${index}`} key={`${alt}-${index}`} />
      </div>
    )
  });
  
  return (
    <div className={styles.Main}>
      {images}
    </div>
  );
}

ImageGrid.propTypes = {
  img: PropTypes.array.isRequired,
  alt: PropTypes.string.isRequired
};
