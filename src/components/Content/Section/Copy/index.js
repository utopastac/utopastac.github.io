import React from "react";
import PropTypes from 'prop-types';
import Markdown from 'components/Markdown';
import styles from "./index.module.sass";

export default function Copy(props) {
  const { copy } = props;
  return (
    <div className={styles.Main}>
      <Markdown copy={copy} />
    </div>
  );
}

Copy.propTypes = {
  copy: PropTypes.string.isRequired,
};
