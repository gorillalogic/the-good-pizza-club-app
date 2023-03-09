import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getRecords } from '../../../services/records-service';

export const fetchRecords = createAsyncThunk(
  'records/get',
  async (payload, thunkApi) => {
    try {
      const response = await getRecords();
      const data = response.data;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        thunkApi.rejectWithValue(error.response?.data);
      }
    }
  }
);
