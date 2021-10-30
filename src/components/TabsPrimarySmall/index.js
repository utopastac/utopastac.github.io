import React from "react";
import PropTypes from 'prop-types';
import Tab from 'components/TabsPrimarySmall/Tab';
import styles from "./index.module.sass";

export default function TabsPrimarySmall(props) {

  const {tabData, stuck} = props;


  const tabs = tabData.map((tab, i) => {
    return (
      <Tab {...tab} {...props} index={i} key={`tab${i}`} />
    )
  });

  return (
    <div className={`${styles.Main} ${stuck ? styles.stuck : ''}`}>
      <section className={styles.tabList}>
        {tabs}
      </section>
    </div>
  );

}

TabsPrimarySmall.propTypes = {
  tabData: PropTypes.array.isRequired,
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
  stuck: PropTypes.bool
};
