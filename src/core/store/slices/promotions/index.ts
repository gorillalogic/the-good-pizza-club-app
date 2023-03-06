import { createSlice } from '@reduxjs/toolkit';
import { Promotion } from '../../../../models/Promotion';
import { fetchPromotions } from './asyncThunks';

interface InitialState {
  promotions: Promotion[];
}

const initialState: InitialState = {
  promotions: [],
};

const promotionSlice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPromotions.fulfilled, (state, action) => {
      state.promotions = action.payload;
    });
  },
});

export default promotionSlice.reducer;
