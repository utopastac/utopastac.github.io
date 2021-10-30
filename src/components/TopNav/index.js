import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import MenuButton from 'components/TopNav/MenuButton';
import Overlay from 'components/TopNav/Overlay';
import styles from "./index.module.sass";

function NavBar(props) {

  const {location} = props;
  
  useEffect(() => {
    setActive(false)
  },[location]);
  
  const [active, setActive] = useState(false);

  return (
    <div className={styles.Main}>
      <MenuButton setActive={setActive} />
      <Overlay setActive={setActive} show={active} />
    </div>
  );
}

export default withRouter(NavBar);
