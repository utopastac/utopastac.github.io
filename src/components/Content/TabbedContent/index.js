import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import TabsSecondary from "components/TabsSecondary";
import styles from "./index.module.sass";
import ThemeContext from "containers/ThemeContext";

export default function TabbedContent(props) {

  const { tabs, localTheme } = props;

  const [active, setActive] = useState(0);

  const globalTheme = useContext(ThemeContext);
  const theme = localTheme ? localTheme : globalTheme;

  return (
    <div className={styles.Main}>
      <div className={styles.tabsContent} style={{background: theme.dark}}>
        <div className={styles.tabs}>
          <TabsSecondary tabs={tabs} active={active} setActive={setActive} />
        </div>
        <div className={styles.content}>
          { React.createElement(tabs[active].component, {...tabs[active].data}) }
        </div>
      </div>
    </div>
  );
}

TabbedContent.propTypes = {
  tabs: PropTypes.array.isRequired,
  localTheme: PropTypes.object
};
