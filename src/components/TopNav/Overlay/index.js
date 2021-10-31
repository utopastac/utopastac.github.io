import React, { useContext } from "react";
import PropTypes from 'prop-types';
import ThemeContext from "containers/ThemeContext";
import { Link } from "react-router-dom";
import CloseButton from 'components/TopNav/CloseButton';
import Animated, {FADE, HEIGHT, RIGHT, BOTTOM, LEFT, TOP, SCALE} from 'containers/Animated';
import styles from "./index.module.sass";

import * as Data from 'data/navigation';

export default function Overlay(props) {
  const {setActive, show} = props;
  
  const theme = useContext(ThemeContext);
  
  const content = Data.NAV_ITEMS.map((item, i) => {
    const {path, title, links} = item;
    return (
      <div className={styles.linkBlock} key={`links${i}`}>
        <Link to={path}><h5>{title}</h5></Link>
        <ul>
          {links}
        </ul>
      </div>
    )
  })
  
  return (
    <Animated show={show} type={RIGHT}>
      <div className={styles.Main}>
        <div className={styles.content}>
          <div className={`${styles.linkBlock} ${styles.homeLink}`}>
            <Link to={Data.HOME.path}><h5>Home</h5></Link>
          </div>
          <section className={styles.links}>
            
            {content}
          </section>
        </div>
        <CloseButton setActive={setActive} />
      </div>
    </Animated>
  );
}

Overlay.propTypes = {
  setActive: PropTypes.func,
};
