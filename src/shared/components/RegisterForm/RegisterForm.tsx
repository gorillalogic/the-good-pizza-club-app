import { Button, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../core/hooks/useAppDispatch';
import { registerAsync } from '../../../core/store/slices/auth/asyncThunks';
import { showSnackbar } from '../../../core/store/slices/snackbar';
import { HttpError } from '../../../models/Error';
import { EMAIL_PATTERN, PHONE_PATTERN } from '../../constants/patterns';
import styles from './RegisterForm.module.scss';

interface FormValues {
  email: string;
  password: string;
  name: string;
  phone: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await dispatch(registerAsync(data)).unwrap();
      navigate('/home', { replace: true });
    } catch (error) {
      const { message } = error as HttpError;
      dispatch(showSnackbar({ color: 'error', message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['form-title']}>Happy to have you!</h2>
      <div className={styles['form-group']}>
        <label htmlFor="email">Email</label>
        <TextField
          id="email"
          type="text"
          {...register('email', { required: true, pattern: EMAIL_PATTERN })}
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
      <div className={styles['form-group']}>
        <label htmlFor="name">Name</label>
        <TextField
          id="name"
          type="text"
          {...register('name', { required: true })}
        />
        {errors?.name?.type === 'required' && (
          <p className={styles['form-error']}>Name is required</p>
        )}
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="phone">Phone Number</label>
        <TextField
          id="phone"
          type="text"
          {...register('phone', { required: true, pattern: PHONE_PATTERN })}
        />
        {errors?.phone?.type === 'required' && (
          <p className={styles['form-error']}>Phone is required</p>
        )}
        {errors?.phone?.type === 'pattern' && (
          <p className={styles['form-error']}>
            Please supply a valid phone number
          </p>
        )}
      </div>
      <div className={styles['form-actions']}>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          className={styles.button}
        >
          {!loading && 'Sign up'}
          {loading && <CircularProgress size={30} color="inherit" />}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
