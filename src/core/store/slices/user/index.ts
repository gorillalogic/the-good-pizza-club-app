import { createSlice } from '@reduxjs/toolkit';
import { Address } from '../../../../models/Address';
import { Payment } from '../../../../models/Payment';
import {
  createAddressAsync,
  createPaymentAsync,
  deleteAddressAsync,
  deletePaymentAsync,
  getAddressesAsync,
  getPaymentsAsync,
} from './asyncThunks';

interface UserState {
  addresses: Address[];
  payments: Payment[];
}

const initialState: UserState = {
  addresses: [],
  payments: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAddressesAsync.fulfilled, (state, action) => {
      state.addresses = action.payload;
    });
    builder.addCase(createAddressAsync.fulfilled, (state, action) => {
      state.addresses = [...state.addresses, action.payload];
    });
    builder.addCase(deleteAddressAsync.fulfilled, (state, action) => {
      state.addresses = state.addresses.filter(
        (a) => a.id !== action.payload.id
      );
    });
    builder.addCase(getPaymentsAsync.fulfilled, (state, action) => {
      state.payments = action.payload;
    });
    builder.addCase(createPaymentAsync.fulfilled, (state, action) => {
      state.payments = [...state.payments, action.payload];
    });
    builder.addCase(deletePaymentAsync.fulfilled, (state, action) => {
      state.payments = state.payments.filter((p) => p.id !== action.payload.id);
    });
  },
});

export default userSlice.reducer;
