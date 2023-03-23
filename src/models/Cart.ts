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
}
