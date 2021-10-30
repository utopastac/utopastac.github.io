import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styles from "./index.module.sass";

export default function LinkBlock(props) {
  const { title, intro, date, basePath, path, type } = props;
  if(type==='link') return null;
  return (
    <Link to={`${basePath}${path}`} className={styles.Main}>
      <div className={styles.backer} />
      <header>
        {date &&
          <h5>{date}</h5>
        }
        <h4>{title}</h4>
      </header>
      <p>{intro}</p>
      <div className={styles.block}></div>
    </Link>
  );
}

LinkBlock.propTypes = {
  title: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  date: PropTypes.string
};
