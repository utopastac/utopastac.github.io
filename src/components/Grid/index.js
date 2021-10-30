import React from "react";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";

export default function Grid(props) {

  const { sections, basePath, identifier, component, componentProps, singleColumn } = props;

  const sectionElements = sections.map((section, i)=>{
    const items = section[identifier].map((item, i)=>{
      return(
        React.createElement(component, {
          ...componentProps,
          path: `${basePath}${section.path ? section.path : ''}${item.path}`,
          subtitle: item.subtitle ? item.subtitle : null,
          title: item.title,
          index: item.index ? item.index : null,
          key: `link${i}`
        })
      )
    });
    return (
      <li className={styles.section} key={`section${i}`}>
        <header><h6>{section.title}</h6></header>
        <ul>{items}</ul>
      </li>
    );
  })


  return (
    <div className={`${styles.Main} ${singleColumn ? styles.singleColumn : ''}`}>
      <ul className={styles.rules}>
        {sectionElements}
      </ul>
    </div>
  );
}

Grid.propTypes = {
  sections: PropTypes.array.isRequired,
  basePath: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
  componentProps: PropTypes.object.isRequired,
  singleColumn: PropTypes.bool.isRequired
};

Grid.defaultProps = {
  componentProps: {},
  singleColumn: false
}
