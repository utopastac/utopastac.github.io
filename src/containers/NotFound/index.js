import React from "react";
import PageHeader from "components/PageHeader";
import styles from "./index.module.sass";
import * as Colors from 'data/colors';

import UseSetTheme from 'hooks/UseSetTheme';

export default function NotFound(props) {

  UseSetTheme(props.appProps.setTheme, Colors.YOLK_THEME);

  return (
    <div className={styles.Main}>
      <PageHeader data={{title: 'Oops, sorry!', subtitle: 'Page not Found! Try looking somewhere else.'}} />
    </div>
  );
}
