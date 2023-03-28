import { createSlice } from '@reduxjs/toolkit';
import { Address } from '../../../../models/Address';
import { Payment } from '../../../../models/Payment';
import { fetchAddreses, fetchPayments } from './asyncThunks';

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
    builder.addCase(fetchAddreses.fulfilled, (state, action) => {
      state.addresses = action.payload;
    });
    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      state.payments = action.payload;
    });
  },
});

export default userSlice.reducer;
