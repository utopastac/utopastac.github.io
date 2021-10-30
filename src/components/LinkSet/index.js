import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styles from "./index.module.sass";

export default function LinkSet(props) {

  const { data, basePath } = props;
  
  const elements = data.PAGES.map((page, i) => {
    const element =   page.type==='link' ?
                      <a href={page.path}>{page.title}</a> :
                      <Link to={`${basePath}${page.path}`}>{page.title}</Link>;
      
    return (
      <li key={`page${i}`} className={page.type==='link' ? styles.link: styles.internal }>
        { element }
      </li>
    )
  });

  return (
    <ul className={styles.Main}>
      { elements }
    </ul>
  );
}

LinkSet.propTypes = {
  data: PropTypes.array.isRequired,
  basePath: PropTypes.string.isRequired
};
