import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Landing.module.scss';

const Landing: React.FC = () => {
  return (
    <>
      <h1 className={styles.title}>WELCOME!</h1>
      <h2 className={styles.subtitle}>Make yourself at home</h2>
      <div className={styles.actions}>
        <Link to="/login">
          <Button variant="outlined" color="error">Log In</Button>
        </Link>
        <Link to="/register">
          <Button variant="contained" color="error">Sign Up</Button>
        </Link>
      </div>
    </>
  );
};

export default Landing;
