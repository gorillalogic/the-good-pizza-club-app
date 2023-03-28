import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from '../../../../shared/utils/http';
import { getAddresses, getPayments } from '../../../services/user-service';
import { RootState } from '../../store';

export const fetchAddreses = createAsyncThunk(
  'address/get',
  async (_payload, thunkApi) => {
    const state = thunkApi.getState();
    const { addresses } = (state as RootState).user;

    if (addresses.length > 0) {
      return addresses;
    }

    try {
      const response = await getAddresses();
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      thunkApi.rejectWithValue(message);
    }
  }
);

export const fetchPayments = createAsyncThunk(
  'payment/get',
  async (_payload, thunkApi) => {
    const state = thunkApi.getState();
    const { payments } = (state as RootState).user;

    if (payments.length > 0) {
      return payments;
    }

    try {
      const response = await getPayments();
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      thunkApi.rejectWithValue(message);
    }
  }
);
