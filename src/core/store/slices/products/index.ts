import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../../../models/Product';
import { fetchProducts } from './asynchThunks';

interface InitialState {
  products: Product[];
}

const initialState: InitialState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
