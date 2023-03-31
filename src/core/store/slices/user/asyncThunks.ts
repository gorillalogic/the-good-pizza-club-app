import { createAsyncThunk } from '@reduxjs/toolkit';
import { Address } from '../../../../models/Address';
import { Payment } from '../../../../models/Payment';
import { getErrorMessage } from '../../../../shared/utils/http';
import {
  createAddress,
  createPayament,
  deleteAddress,
  deletePayment,
  getAddresses,
  getPayments,
} from '../../../services/user-service';
import { RootState } from '../../store';

export const getAddressesAsync = createAsyncThunk(
  'address/get',
  async (_, thunkApi) => {
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
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const createAddressAsync = createAsyncThunk(
  'address/create',
  async (payload: Partial<Address>, thunkApi) => {
    try {
      const response = await createAddress(payload);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteAddressAsync = createAsyncThunk(
  'address/delete',
  async (payload: number, thunkApi) => {
    try {
      const response = await deleteAddress(payload);
      return { id: payload, ...response.data };
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getPaymentsAsync = createAsyncThunk(
  'payment/get',
  async (_, thunkApi) => {
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
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const createPaymentAsync = createAsyncThunk(
  'payment/create',
  async (payload: Partial<Payment>, thunkApi) => {
    try {
      const response = await createPayament(payload);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deletePaymentAsync = createAsyncThunk(
  'payment/delete',
  async (payload: number, thunkApi) => {
    try {
      const response = await deletePayment(payload);
      return { id: payload, ...response.data };
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);
