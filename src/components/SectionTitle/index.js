import React from "react";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";
import * as Colors from 'data/colors';

export default function SectionTitle(props) {
  const { title, color, sub, small } = props;

  return (
    <section className={`${styles.Main} ${small ? styles.small : ''}`}>
      <div className={styles.block} style={{background: color}}/>
      { sub &&
        <h4 style={{color: color}}>{sub}</h4>
      }
      <h1 style={{color: color}}>{title}</h1>
    </section>
  );
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  small: PropTypes.bool.isRequired,
  sub: PropTypes.string
};

SectionTitle.defaultProps = {
  title: 'Hello',
  color: Colors.BLACK,
  small: false
}
