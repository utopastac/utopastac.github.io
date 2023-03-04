import React from "react";
import PropTypes from 'prop-types';
import Image from 'components/Image';
import styles from "./index.module.sass";

export default function ImageList(props) {
  const { images } = props;
  
  const imageElements = images.map((image, index)=>{
    return (
      <div className={styles.image}>
        <Image img={image.img} alt={image.alt} key={`${image.alt}-${index}`} />
      </div>
    )
  });
  
  return (
    <div className={styles.Main}>
      {imageElements}
    </div>
  );
}

ImageList.propTypes = {
  images: PropTypes.array.isRequired
};
