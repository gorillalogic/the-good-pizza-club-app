import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem } from '../../../../models/Cart';

const initialState: Cart = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItem>) => {
      const { id, size, quantity, extras } = action.payload;

      let item = state.items.find((item) => item.id === id);

      if (!item) {
        state.items = [...state.items, action.payload];
        item = state.items[state.items.length - 1];
      } else {
        item.quantity += quantity;
      }

      let productPrice = 0;
      let extrasPrice = 0;

      if (action.payload.product) {
        // regular product
        productPrice = action.payload.product.price + size.price;
      } else {
        // custom product
        const itemsPrice =
          action.payload.items?.reduce((acc, cur) => (acc += cur.price), 0) ||
          0;
        productPrice = itemsPrice + size.price;
      }

      extrasPrice =
        extras?.reduce((acc, cur) => (acc += cur.price * cur.quantity), 0) || 0;

      item.unitPrice = productPrice;
      item.subtotal = productPrice * quantity + extrasPrice;
      state.total += item.subtotal;
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (!item) return;

      state.items = state.items.filter((i) => i !== item);
      state.total -= item.subtotal || 0;
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ item: CartItem; quantity: number }>
    ) => {
      const { item, quantity } = action.payload;
      const index = state.items.findIndex((i) => i.id === item.id);
      const difference = (quantity - item.quantity) * (item.unitPrice || 1);

      state.items[index].quantity = quantity;
      state.items[index].subtotal = (item.unitPrice || 1) * quantity;
      state.total += difference;
    },
  },
});

export default cartSlice.reducer;
export const { addProduct, removeProduct, updateProductQuantity } =
  cartSlice.actions;
