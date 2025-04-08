import React, { useContext } from "react";
import { useLocation } from "react-router-dom"; // Use useLocation hook
import ThemeContext from "containers/ThemeContext";
import NavItem from 'components/NavBar/NavItem';
import Home from 'components/NavBar/Home';
import styles from "./index.module.sass";
import UseIntersect from "hooks/UseIntersect";

import * as Data from 'data/navigation';

function NavBar() {
  const location = useLocation(); // Directly use useLocation hook

  const theme = useContext(ThemeContext);

  const [ref, entry] = UseIntersect({
    threshold: [0.01]
  });

  const stuck = entry.intersectionRatio < 0.01;
  
  const home = (
    <Home
      {...Data.HOME}
      active={location.pathname === Data.HOME.path}
      stuck={stuck}
    />
  );

  const navItems = Data.NAV_ITEMS.map((navItem, i) => (
    <NavItem
      {...navItem}
      active={location.pathname.includes(`${navItem.path}/w`)}
      stuck={stuck}
      key={`navItem${i}`}
    />
  ));

  return (
    <div className={`${styles.Main} ${stuck ? styles.active : ''}`}>
      <div className={styles.sentinel} ref={ref} />
      <div className={styles.block} style={{background: theme.bg}} />
      {/* <div className={styles.line} style={{background: theme.text}} /> */}
      <div className={styles.content}>
        <div className={styles.nav}>
          <ul className={styles.navList}>
            {home}
            {navItems}
          </ul>
        </div>
      </div>
      
    </div>
  );
}

export default NavBar;
