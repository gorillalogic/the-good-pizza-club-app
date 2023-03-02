import { Button, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../core/hooks/useAppDispatch';
import { loginAsync } from '../../../core/store/slices/auth/asyncThunks';
import { showSnackbar } from '../../../core/store/slices/snackbar';
import { HttpError } from '../../../models/Error';
import { EMAIL_PATTERN } from '../../constants/patterns';
import styles from './LoginForm.module.scss';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      await dispatch(loginAsync(data)).unwrap();
      navigate('/', { replace: true });
    } catch (error) {
      const { message } = error as HttpError;
      dispatch(showSnackbar({ color: 'error', message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['form-title']}>Welcome back!</h2>
      <div className={styles['form-group']}>
        <label htmlFor="email">Email</label>
        <TextField
          id="email"
          type="text"
          {...register('email', { pattern: EMAIL_PATTERN, required: true })}
        />
        {errors?.email?.type === 'required' && (
          <p className={styles['form-error']}>Email is required</p>
        )}
        {errors?.email?.type === 'pattern' && (
          <p className={styles['form-error']}>Please supply a valid email</p>
        )}
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="password">Password</label>
        <TextField
          id="password"
          type="password"
          {...register('password', { required: true })}
        />
        {errors?.password?.type === 'required' && (
          <p className={styles['form-error']}>Password is required</p>
        )}
      </div>
      <div className={styles['form-actions']}>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          className={styles.button}
        >
          {!loading && 'Log in'}
          {loading && <CircularProgress size={30} color="inherit" />}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
