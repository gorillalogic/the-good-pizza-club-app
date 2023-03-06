import { RootState } from '../../store';

export const promotionsSelector = (state: RootState) =>
  state.promotions.promotions;
