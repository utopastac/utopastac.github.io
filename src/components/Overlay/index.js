import React from "react";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";
import * as Colors from 'data/colors';

export default function Overlay(props) {
  const { children, close, title, subtitle } = props;

  return (
    <section className={styles.Main}>
      <div className={styles.backer} onClick={close} />
      <div className={styles.content}>
        <header>
          <div className={styles.header}>
            <div className={styles.close} onClick={close} />
            <h6>{title}</h6>
          </div>
        </header>
        <div>
          {children}
        </div>
      </div>
    </section>
  );
}

Overlay.propTypes = {
  children: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
