import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styles from "./index.module.sass";

export default function TextLink(props) {
  const { title, path } = props;

  return (
    <Link to={path}>
      <div className={styles.Main}>
        <span>{title}</span>
      </div>
    </Link>
  );
}

TextLink.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
