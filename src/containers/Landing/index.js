import React from "react";
import PropTypes from 'prop-types';
import MainContent from "containers/MainContent";
import PageHeader from "components/PageHeader";
import LinkBlock from "components/LinkBlock";
import styles from "./index.module.sass";

import UseSetTheme from 'hooks/UseSetTheme';

export default function Landing(props) {
  
  const { landingTheme, data, path } = props;


  UseSetTheme(props.appProps.setTheme, landingTheme);
  
  const elements = data.PAGES.map((page, i) => {
    return (
      <LinkBlock {...page} basePath={path} key={`page${i}`} />
    )
  });

  return (
    <div className={styles.Main}>
      <PageHeader data={data.TITLE_BLOCK} />
      <section className={styles.pages}>
        <MainContent>
          <div className={styles.content}>
            {elements}
          </div>
        </MainContent>
      </section>

    </div>
  );
}

Landing.propTypes = {
  landingTheme: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};
