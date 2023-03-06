import { Product } from './Product';

export interface Promotion {
  id: number;
  name: string;
  description: string;
  image: string;
  product: Product;
}
