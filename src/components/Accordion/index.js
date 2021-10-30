import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styles from "./index.module.sass";

import * as NavigationData from 'data/navigation';

export default function Section(props) {
  const {ruleType} = props;

  const [active, setActive] = useState(false);

  const sectionElements = ruleType.sections.map((section, i)=>{
    const rules = section.contents.map((rule, i)=>{
      const { index } = rule;
      return(
        <Link to={`${NavigationData.PROCESS_PATH}${ruleType.path}${section.path}${rule.path}`} key={`link${i}`}>
          <li className={styles.link}>
            <span>{index < 10 ? `0${index}` : index}</span>
            <p>{rule.title}</p>
          </li>
        </Link>
      )
    });
    return (
      <li className={styles.section} key={`section${i}`}>
        <h6>{section.title}</h6>
        <ul>{rules}</ul>
      </li>
    );
  });

  return (
    <section className={`${styles.Main} ${active ? styles.active : ''}`}>
      <header onClick={()=>setActive(!active)}>
        <h4>{ruleType.title}</h4>
      </header>
      {active &&
        <ul>
          {sectionElements}
        </ul>
      }
    </section>
  );
}

Section.propTypes = {
  ruleType: PropTypes.object.isRequired,
};
