import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // use useLocation hook
import MenuButton from 'components/TopNav/MenuButton';
import Overlay from 'components/TopNav/Overlay';
import styles from "./index.module.sass";

function NavBar() {
  const location = useLocation(); // Access location directly
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
  }, [location]);

  return (
    <div className={styles.Main}>
      {/* <div className={styles.logo}>
        <h4>Peter Wright</h4>
        <h5>Portfolio 2025</h5>
      </div> */}
      <MenuButton setActive={setActive} />
      <Overlay setActive={setActive} show={active} />
    </div>
  );
}

export default NavBar;
