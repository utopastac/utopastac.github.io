import React from "react";
import styles from "./index.module.sass";
import PageHeader from "components/PageHeader";

import * as Data from 'data/home';
import * as Colors from 'data/colors';

import UseSetTheme from 'hooks/UseSetTheme';

export default function Home(props) {

  const { TITLE_BLOCK } = Data;

  UseSetTheme(props.appProps.setTheme, Colors.TRANSPARENT_THEME);//Colors.randomTheme()


  return (
    <div className={styles.Main}>

      <PageHeader data={TITLE_BLOCK} />
    </div>
  );
}

//<SectionPromoList data={PROMO_BLOCK.promos} basePath='' title='Our Approach' />
