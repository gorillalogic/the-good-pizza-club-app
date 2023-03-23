import { RootState } from '../../store';

const cartSelectors = {
  selectItems: (state: RootState) => state.cart.items,
  totalItems: (state: RootState) => state.cart.items.length,
};

export default cartSelectors;
