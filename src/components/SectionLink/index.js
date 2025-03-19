import React, { useContext } from "react";
import ThemeContext from "containers/ThemeContext";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";

export default function SectionLink(props) {
  const { title, subtitle, cta, path } = props;

  const theme = useContext(ThemeContext);

  return (
    <a href={path} className={styles.Main}>
      <header>
        <h5>{title}</h5>
        <p>{subtitle}</p>
      </header>
      
      <div className={styles.cta}>{cta}</div>
    </a>
  );
}

SectionLink.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
