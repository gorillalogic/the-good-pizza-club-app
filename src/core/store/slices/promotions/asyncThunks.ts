import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getPromotions } from '../../../services/promotions-service';

export const fetchPromotions = createAsyncThunk(
  'promotions/get',
  async (payload, thunkApi) => {
    try {
      const response = await getPromotions();
      const data = response.data;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  }
);
