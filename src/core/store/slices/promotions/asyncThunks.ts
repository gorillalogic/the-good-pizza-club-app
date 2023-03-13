import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getPromotions } from '../../../services/promotions-service';
import { RootState } from '../../store';

export const fetchPromotions = createAsyncThunk(
  'promotions/get',
  async (payload, thunkApi) => {
    const state = thunkApi.getState();
    const { promotions } = (state as RootState).promotions;

    if (promotions.length > 0) {
      return promotions;
    }

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
