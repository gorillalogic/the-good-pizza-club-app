import { Address } from './Address';
import { Payment } from './Payment';
import { Product } from './Product';
import { Promotion } from './Promotion';
import { QuantifiedRecord, Record } from './Record';

export interface CartItem {
  id: number;
  size: Record;
  quantity: number;
  product?: Product;
  items?: Record[];
  promotion?: Promotion;
  extras?: QuantifiedRecord[];
  subtotal?: number;
  unitPrice?: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  totalDiscounts: number;
  totalTaxes: number;
  selectedPayment: Payment | null;
  selectedAddress: Address | null;
  placed: boolean;
}
