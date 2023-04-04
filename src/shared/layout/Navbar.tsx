import { Icon, IconButton } from '@mui/material';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authContext } from '../../core/context/authCtx';
import authSelectors from '../../core/store/slices/auth/selectors';
import cartSelectors from '../../core/store/slices/cart/selectors';
import { NAVBAR_ITEMS } from '../constants/global.constants';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const isLoggedIn = useSelector(authSelectors.loggedIn);
  const cartItems = useSelector(cartSelectors.totalItems);
  const isOrderPlaced = useSelector(cartSelectors.placed);
  const authCtx = useContext(authContext);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    authCtx.logout();
    toggleMenu();
  };

  const listClasses = `${styles.list} ${
    !showMenu ? styles['list--hidden'] : ''
  }`;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <NavLink
          to={isLoggedIn ? '/home' : '/'}
          onClick={() => setShowMenu(false)}
        >
          <img src="images/logo.svg" alt="The Good Pizza Club Logo" />
        </NavLink>
        <IconButton className={styles.button} size="small" onClick={toggleMenu}>
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
              onClick={toggleMenu}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        {isLoggedIn && (
          <>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
            <li>
              <NavLink
                to={`${isOrderPlaced ? '/cart/order-placed' : '/cart'}`}
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
                onClick={toggleMenu}
              >
                {cartItems && (
                  <span className={styles.cartItems}>{cartItems}</span>
                )}
                <Icon>shopping_cart</Icon>
              </NavLink>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              onClick={toggleMenu}
            >
              Log in/Sign up
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
