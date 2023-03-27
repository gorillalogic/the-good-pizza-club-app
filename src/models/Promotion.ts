import { Product } from './Product';
import { Record } from './Record';

export interface Promotion {
  id: number;
  name: string;
  description: string;
  image: string;
  size: Record;
  product: Product;
  discount: number;
}
