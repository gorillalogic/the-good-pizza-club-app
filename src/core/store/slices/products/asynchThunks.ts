import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getProducts } from '../../../services/products-service';

export const fetchProducts = createAsyncThunk(
  'products/get',
  async (payload, thunkApi) => {
    try {
      const response = await getProducts();
      const data = response.data;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  }
);
