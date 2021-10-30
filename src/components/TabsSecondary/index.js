import React, { useContext } from "react";
import PropTypes from 'prop-types';
import Tab from 'components/TabsSecondary/Tab';
import UseIntersect from "hooks/UseIntersect";
import styles from "./index.module.sass";
import ThemeContext from "containers/ThemeContext";

export default function TabsSecondary(props) {

  const { tabs } = props;

  const theme = useContext(ThemeContext);

  const tabElements = tabs.map((tab, i) => {
    return (
      <Tab {...tab} {...props} index={i} key={`tab${i}`} />
    )
  });

  const [ref, entry] = UseIntersect({
    threshold: [1]
  });

  const stuck = entry.intersectionRatio < 1;

  return (
    <div className={`${styles.Main} ${stuck ? styles.active : ''}`}>
      <div className={styles.sentinel} ref={ref} />
      <section className={styles.tabList}>
        {tabElements}
      </section>
    </div>
  );

}

TabsSecondary.propTypes = {
  tabs: PropTypes.array.isRequired,
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired
};
