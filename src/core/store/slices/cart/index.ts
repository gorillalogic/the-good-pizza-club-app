import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address } from '../../../../models/Address';
import { Cart, CartItem } from '../../../../models/Cart';
import { Payment } from '../../../../models/Payment';

const taxes = 0.1;
const delivery = 5;

const initialState: Cart = {
  items: [],
  total: 0,
  subtotal: 0,
  totalDiscounts: 0,
  totalTaxes: 0,
  selectedPayment: null,
  selectedAddress: null,
  placed: false,
};

function calculateTotals(items: CartItem[], taxes: number, delivery: number) {
  let total = 0;
  let subtotal = 0;
  let totalDiscounts = 0;
  let totalTaxes = 0;

  items.forEach((item) => {
    if (item.subtotal) {
      subtotal += item.subtotal;
    }

    if (item.subtotal && item.promotion?.discount) {
      totalDiscounts += item.subtotal * item.promotion?.discount;
    }
  });

  total = subtotal - totalDiscounts;
  totalTaxes = total * taxes;

  return {
    subtotal,
    totalDiscounts,
    totalTaxes: totalTaxes,
    total: total + totalTaxes + (items.length ? delivery : 0),
  };
}

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

      const { total, subtotal, totalDiscounts, totalTaxes } = calculateTotals(
        state.items,
        taxes,
        delivery
      );

      state.total = total;
      state.subtotal = subtotal;
      state.totalDiscounts = totalDiscounts;
      state.totalTaxes = totalTaxes;
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (!item) return;

      state.items = state.items.filter((i) => i !== item);

      const { total, subtotal, totalDiscounts, totalTaxes } = calculateTotals(
        state.items,
        taxes,
        delivery
      );

      state.total = total;
      state.subtotal = subtotal;
      state.totalDiscounts = totalDiscounts;
      state.totalTaxes = totalTaxes;
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ item: CartItem; quantity: number }>
    ) => {
      const { item, quantity } = action.payload;
      const index = state.items.findIndex((i) => i.id === item.id);

      state.items[index].quantity = quantity;
      state.items[index].subtotal = (item.unitPrice || 1) * quantity;

      const { total, subtotal, totalDiscounts, totalTaxes } = calculateTotals(
        state.items,
        taxes,
        delivery
      );

      state.total = total;
      state.subtotal = subtotal;
      state.totalDiscounts = totalDiscounts;
      state.totalTaxes = totalTaxes;
    },
    selectPayment: (state, action: PayloadAction<Payment>) => {
      state.selectedPayment = action.payload;
    },
    selectAddress: (state, action: PayloadAction<Address>) => {
      state.selectedAddress = action.payload;
    },
    placeOrder: (state) => {
      state.placed = true;
    },
    resetCart: () => {
      return initialState;
    },
  },
});

export default cartSlice.reducer;
export const {
  addProduct,
  removeProduct,
  updateProductQuantity,
  selectAddress,
  selectPayment,
  placeOrder,
  resetCart,
} = cartSlice.actions;
