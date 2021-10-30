import React, { useState, useContext } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styles from "./index.module.sass";
import ThemeContext from "containers/ThemeContext";
//
import * as Colors from 'data/colors';

export const LARGE = "SECTION_PROMO_LARGE";
export const MEDIUM = "SECTION_PROMO_MEDIUM";
export const SMALL = "SECTION_PROMO_SMALL";
export const TINY = "SECTION_PROMO_TINY";

export default function SectionPromo(props) {
  const { img, title, subtitle, cta, path, basePath, size } = props;

  const theme = useContext(ThemeContext);

  const [col, setCol] = useState(Colors.BLACK);

  function mouseOver(){
    setCol(theme.text);
  }

  function mouseOut(){
    setCol(Colors.BLACK);
  }

  let style = null;
  switch(size){
    case LARGE:
      style = styles.large;
      break;
    case MEDIUM:
      style = styles.medium;
      break;
    case SMALL:
      style = styles.small;
      break;
    case TINY:
      style = styles.tiny;
      break;
  }

  return (
    <Link to={`${basePath}${path}`}>
      <div className={`${styles.Main} ${style}`} style={{color: col}} onMouseOver={mouseOver} onMouseOut={mouseOut}>
        <div className={styles.backer} style={{background: theme.bg}} />
        <div className={styles.image}>
          <img src={img}></img>
        </div>
        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <p className={styles.cta}>{cta}</p>
        </div>
      </div>
    </Link>
  );
}

SectionPromo.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

SectionPromo.defaultProps = {
  size: LARGE,
  basePath: ''
}
