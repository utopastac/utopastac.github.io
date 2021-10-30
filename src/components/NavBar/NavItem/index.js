import React, { useContext, useState } from "react";
import ThemeContext from "containers/ThemeContext";
import { Link } from "react-router-dom";
import Dropdown from 'components/NavBar/Dropdown';
import PropTypes from 'prop-types';
import styles from "./index.module.sass";

export default function NavItem(props) {
  const { title, path, links, active, stuck } = props;

  const theme = useContext(ThemeContext);

  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <li
      className={`${styles.Main} ${active ? styles.active : ''} ${stuck ? styles.stuck : ''}`}
      style={{color: theme.text}}
      onMouseOver={()=>setDropdownActive(true)}
      onMouseLeave={()=>setDropdownActive(false)}
    >
      <div className={styles.block} style={{background: theme.text}} />
      <Link to={path}>
        <div className={styles.content}>
          <span>
            {title}
            <div className={styles.bar} style={{background: theme.text}} />
          </span>
        </div>
      </Link>
      {dropdownActive &&
        <Dropdown
          setDropdownActive={setDropdownActive}
          component={links}
          stuck={stuck}
        />
      }
    </li>
  );
}

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
  active: PropTypes.bool.isRequired,
  stuck: PropTypes.bool.isRequired,
};
