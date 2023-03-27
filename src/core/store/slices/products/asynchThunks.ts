import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from '../../../../shared/utils/http';
import { getProducts } from '../../../services/products-service';
import { RootState } from '../../store';

export const fetchProducts = createAsyncThunk(
  'products/get',
  async (payload, thunkApi) => {
    const state = thunkApi.getState();
    const { products } = (state as RootState).products;

    if (products.length > 0) {
      return products;
    }

    try {
      const response = await getProducts();
      const data = response.data;

      return data;
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);
