import { RootState } from '../../store';

const cartSelectors = {
  selectItems: (state: RootState) => state.cart.items,
  totalItems: (state: RootState) => state.cart.items.length,
  totals: (state: RootState) => ({
    total: state.cart.total,
    subtotal: state.cart.subtotal,
    totalDiscounts: state.cart.totalDiscounts,
    totalTaxes: state.cart.totalTaxes,
  }),
};

export default cartSelectors;
