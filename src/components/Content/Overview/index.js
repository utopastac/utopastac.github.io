import React, { useContext } from "react";
import PropTypes from 'prop-types';
import Markdown from 'components/Markdown';
import styles from "./index.module.sass";
import ThemeContext from "containers/ThemeContext";

export default function PoliciesList(props) {

  const { copy, img } = props;

  const theme = useContext(ThemeContext);
  // style={{background: theme.text, color: theme.bg}}

  return (
    <div className={styles.Main}>
      <section className={styles.content}>
        <div class={styles.inner}><Markdown copy={copy} /></div>
      </section>
      {img &&
        <section className={styles.image} />
      }
    </div>
  );
}

PoliciesList.propTypes = {
  copy: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
