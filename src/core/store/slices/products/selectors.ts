import { RootState } from '../../store';

export const productsSelector = (state: RootState) => state.products.products;
