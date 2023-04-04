import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authSelectors from '../../../core/store/slices/auth/selectors';
import styles from './Welcome.module.scss';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(authSelectors.loggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home', { replace: true });
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>WELCOME!</h1>
      <h2 className={styles.subtitle}>Make yourself at home</h2>
      <div className={styles.actions}>
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
      </div>
    </div>
  );
};

export default Landing;
