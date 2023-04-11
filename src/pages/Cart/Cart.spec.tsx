import { act, screen } from '@testing-library/react';
import { placeOrder } from '../../core/store/slices/cart';
import { AppStore } from '../../core/store/store';
import { renderWithProviders } from '../../shared/utils/test';
import Cart from './Cart';

const mockedScrollTo = jest.fn();

jest.mock('../../core/hooks/useScrollToRef', () => ({
  __esModule: true,
  default: () => {
    return {
      scrollTo: mockedScrollTo,
    };
  },
}));

describe('CartPage', () => {
  let store: AppStore;

  beforeEach(() => {
    const { store: appStore } = renderWithProviders(<Cart />);
    store = appStore;
  });

  it('should render cart page', () => {
    const title = screen.getByText('WE’RE FAST!');
    const subtitle = screen.getByText('Well, sorta.');

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('should call scrollTo if an order has been placed', () => {
    act(() => {
      store.dispatch(placeOrder());
    });

    expect(mockedScrollTo).toHaveBeenCalled();
  });
});
