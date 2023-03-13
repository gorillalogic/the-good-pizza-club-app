import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getRecords } from '../../../services/records-service';
import { RootState } from '../../store';

export const fetchRecords = createAsyncThunk(
  'records/get',
  async (payload, thunkApi) => {
    const state = thunkApi.getState();
    const { records } = (state as RootState).records;

    if (records.length > 0) {
      return records;
    }

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
