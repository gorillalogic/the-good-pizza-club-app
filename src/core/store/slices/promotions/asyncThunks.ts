import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from '../../../../shared/utils/http';
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
      const message = getErrorMessage(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);
