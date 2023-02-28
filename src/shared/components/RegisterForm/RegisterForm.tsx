import { Button, TextField } from '@mui/material';
import styles from './RegisterForm.module.scss';

const RegisterForm: React.FC = () => {
  return (
    <form className={styles.form}>
      <h2 className={styles['form-title']}>Happy to have you!</h2>
      <label htmlFor="email">Email</label>
      <TextField id="email" type="email" name="email" />
      <label htmlFor="password">Password</label>
      <TextField id="password" type="password" name="password" />
      <label htmlFor="name">Name</label>
      <TextField id="name" type="text" name="name" />
      <label htmlFor="phone">Phone Number</label>
      <TextField id="phone" type="text" name="phone" />
      <div className={styles['form-actions']}>
        <Button color="secondary" variant="contained" className={styles.button}>
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
