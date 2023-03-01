import { Button, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../core/hooks/useAppDispatch';
import { loginAsync } from '../../../core/store/slices/auth/asyncThunks';
import { showSnackbar } from '../../../core/store/slices/snackbar';
import { HttpError } from '../../../models/Error';
import styles from './LoginForm.module.scss';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      await dispatch(loginAsync(data)).unwrap();
      navigate('/', { replace: true });
    } catch (error) {
      const { message } = error as HttpError;
      dispatch(showSnackbar({ color: 'error', message }));
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['form-title']}>Welcome back!</h2>
      <label htmlFor="email">Email</label>
      <TextField id="email" type="email" {...register('email')} required />
      <label htmlFor="password">Password</label>
      <TextField
        id="password"
        type="password"
        {...register('password')}
        required
      />
      <div className={styles['form-actions']}>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          className={styles.button}
        >
          {!isLoading && 'Log in'}
          {isLoading && <CircularProgress size={30} color='inherit' />}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
