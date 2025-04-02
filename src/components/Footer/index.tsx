import React from "react";
import PropTypes from 'prop-types';
import MainContent from "containers/MainContent";
import styles from "./index.module.sass";

import * as Data from 'data/navigation';

export default function Footer(props) {

  const { NAV_ITEMS } = Data;

  const content = NAV_ITEMS.map((item, i) => {
    const {title, links} = item;
    return (
      <div className={styles.linkBlock} key={`footerLinks${i}`}>
        <h5>{title}</h5>
        <ul>
          {links}
        </ul>
      </div>
    )
  })

  return (
    <div className={styles.Main}>
      <MainContent>
        <div className={styles.content}>
          <section className={styles.links}>
            {content}
          </section>
        </div>
      </MainContent>
    </div>
  );
}

Footer.propTypes = {
  
};
