import React from "react";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";
import * as Colors from 'data/colors';

export default function SectionTitle(props) {
  const { title, color, home, small } = props;

  return (
    <section className={`${styles.Main} ${small ? styles.small : ''}`}>
      <div className={styles.block} style={{background: color}}/>
      <h1 style={{color: color}}>{title}</h1>
    </section>
  );
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  small: PropTypes.bool.isRequired
};

SectionTitle.defaultProps = {
  title: 'Hello',
  color: Colors.BLACK,
  small: false
}
