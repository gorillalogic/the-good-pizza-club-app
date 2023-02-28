import { Button, TextField } from '@mui/material';
import styles from './LoginForm.module.scss';

const LoginForm: React.FC = () => {
  return (
    <form className={styles.form}>
      <h2 className={styles['form-title']}>Welcome back!</h2>
      <label htmlFor="email">Email</label>
      <TextField id="email" type="email" name="email" />
      <label htmlFor="password">Password</label>
      <TextField id="password" type="password" name="password" />
      <div className={styles['form-actions']}>
        <Button color="secondary" variant="contained" className={styles.button}>
          Log in
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
