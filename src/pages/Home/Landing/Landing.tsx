import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getLoggedIn,
  getUser,
} from '../../../core/store/slices/auth/selectors';
import styles from './Landing.module.scss';

const Landing: React.FC = () => {
  const isLoggedIn = useSelector(getLoggedIn);
  const user = useSelector(getUser);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>WELCOME!</h1>
      {isLoggedIn && <h2 className={styles.subtitle}>{user?.name}</h2>}
      {!isLoggedIn && (
        <h2 className={styles.subtitle}>Make yourself at home</h2>
      )}
      <div className={styles.actions}>
        {isLoggedIn && (
          <Link to="/menu">
            <Button variant="contained" color="error">
              See Menu
            </Button>
          </Link>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login">
              <Button variant="outlined" color="error">
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="contained" color="error">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Landing;
