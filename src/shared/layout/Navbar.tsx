import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { Icon, IconButton } from '@mui/material';
import { NAVBAR_ITEMS } from '../constants/global.constants';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const listClasses = `${styles.list} ${
    !showMenu ? styles['list--hidden'] : ''
  }`;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <NavLink to="/">
          <img src="images/logo.svg" alt="The Good Pizza Club Logo"/>
        </NavLink>
        <IconButton
          className={styles.button}
          size="small"
          onClick={toggleMenu}
        >
          <Icon>menu</Icon>
        </IconButton>
      </div>
      <ul className={listClasses}>
        {NAVBAR_ITEMS.map((item, index) => (
          <li key={item.url + index}>
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              {item.label}
              {item.icon && <Icon>{item.icon}</Icon>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
