import styles from './Navbar.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { Icon, IconButton } from '@mui/material';
import { NAVBAR_ITEMS } from '../constants/global.constants';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getLoggedIn } from '../../core/store/slices/auth/selectors';
import { logoutAsync } from '../../core/store/slices/auth/asyncThunks';
import { useAppDispatch } from '../../core/hooks/useAppDispatch';
import { showSnackbar } from '../../core/store/slices/snackbar';
import { HttpError } from '../../models/Error';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const isLoggedIn = useSelector(getLoggedIn);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const listClasses = `${styles.list} ${
    !showMenu ? styles['list--hidden'] : ''
  }`;

  const logoutHandler = async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      navigate('/');
    } catch (error) {
      const { message } = error as HttpError;
      dispatch(showSnackbar({ color: 'error', message }));
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <NavLink to="/">
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
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        {isLoggedIn && (
          <>
            <li>
              <a onClick={logoutHandler}>Logout</a>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <Icon>shopping_cart</Icon>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
