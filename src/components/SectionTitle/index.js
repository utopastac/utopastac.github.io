import React from "react";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";
import * as Colors from 'data/colors';

export default function SectionTitle(props) {
  const { title, color, home } = props;

  return (
    <section className={styles.Main}>
      <div className={styles.block} style={{background: color}}/>
      {home &&
        <div className={styles.peter}>
          <h4>{ home }</h4>
        </div>
      }
      <h1 style={{color: color}}>{title}</h1>
    </section>
  );
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

SectionTitle.defaultProps = {
  title: 'Hello',
  color: Colors.BLACK
}
