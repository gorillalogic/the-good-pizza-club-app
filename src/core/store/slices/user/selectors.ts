import { RootState } from '../../store';

const userSelectors = {
  selectAddreses: (state: RootState) => state.user.addresses,
  selectPayments: (state: RootState) => state.user.payments,
};

export default userSelectors;
