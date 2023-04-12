import { Cart, CartItem } from '../models/Cart';
import { MOCK_SIZES } from './customize';
import { MOCK_PRODUCTS } from './products';

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: 0,
    size: MOCK_SIZES[0],
    product: MOCK_PRODUCTS[0],
    quantity: 1,
    subtotal: 10,
    unitPrice: 10,
  },
];

export const MOCK_CART: Cart = {
  items: MOCK_CART_ITEMS,
  total: 10,
  subtotal: 10,
  totalDiscounts: 0,
  totalTaxes: 0.1,
  selectedPayment: null,
  selectedAddress: null,
  placed: false,
};
