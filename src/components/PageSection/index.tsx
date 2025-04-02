import React from "react";
import PropTypes from 'prop-types';
import styles from "./index.module.sass";

export default function PageSection(props) {

  const { title, component } = props;

  return (
    <div className={styles.Main}>
      {title &&
        <header>
          <h4>{ title }</h4>
        </header>
      }
      <section className={styles.content}>
        { React.createElement(component, {...props}) }
      </section>
    </div>
  );
}

PageSection.propTypes = {
  title: PropTypes.string,
  component: PropTypes.func.isRequired,
};
