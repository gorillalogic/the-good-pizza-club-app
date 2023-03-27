import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../../../models/User';
import { LOCALSTORAGE_KEYS } from '../../../../shared/constants/global.constants';
import { getErrorMessage } from '../../../../shared/utils/http';
import { login, logout, register } from '../../../services/auth-service';

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, thunkApi) => {
    try {
      const response = await login(payload.email, payload.password);
      localStorage.setItem(
        LOCALSTORAGE_KEYS.user,
        JSON.stringify(response.data)
      );
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (payload, thunkApi) => {
    try {
      const response = await logout();
      localStorage.removeItem(LOCALSTORAGE_KEYS.user);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (payload: Partial<User>, thunkApi) => {
    try {
      const response = await register(payload);
      localStorage.setItem(
        LOCALSTORAGE_KEYS.user,
        JSON.stringify(response.data)
      );
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);
