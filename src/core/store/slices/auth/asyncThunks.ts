import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { User } from '../../../../models/User';
import { login, logout } from '../../../services/auth-service';

export const loginAsync = createAsyncThunk<
  Partial<User>,
  { email: string; password: string }
>('auth/login', async (payload, thunkApi) => {
  try {
    const response = await login(payload.email, payload.password);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (payload, thunkApi) => {
    try {
      const response = await logout();
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  }
);
