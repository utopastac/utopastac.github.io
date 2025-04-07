import React from "react";
import PropTypes from 'prop-types';
import ReactMarkdown from "react-markdown";
import styles from "./index.module.sass";

export default function Markdown(props) {
  const { copy } = props;
  return (
    <div className={styles.Main}>
      <ReactMarkdown children={copy} />
    </div>
  );
}

Markdown.propTypes = {
  data: PropTypes.object,
};
