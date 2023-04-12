import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MOCK_ADDRESSES } from '../../../mocks/addresses';
import { MOCK_CART } from '../../../mocks/cart';
import { MOCK_PAYMENTS } from '../../../mocks/payments';
import {
  renderWithProviders,
  setupHttpMocks,
} from '../../../shared/utils/test';

jest.mock('../../../core/hooks/useScrollToRef', () => ({
  __esModule: true,
  default: () => {
    return {
      scrollTo: jest.fn(),
    };
  },
}));

describe('CheckoutPage', () => {
  const renderOptions = {
    route: '/cart',
    preloadedState: {
      auth: {
        isLoggedIn: true,
        user: null,
      },
      cart: MOCK_CART,
    },
  };

  describe('success flow', () => {
    const handlers = [
      rest.get('/users/address', (_, res, ctx) =>
        res(ctx.json(MOCK_ADDRESSES))
      ),
      rest.get('/users/payment', (_, res, ctx) => res(ctx.json(MOCK_PAYMENTS))),
    ];

    setupHttpMocks(handlers);

    beforeEach(async () => {
      renderWithProviders(renderOptions);
      await act(() => Promise.resolve());
    });

    it('should render Checkout page', () => {
      const checkoutEl = screen.getByTestId('checkout');
      expect(checkoutEl).toBeInTheDocument();
    });

    it('should move to Address tab on Next Step button click', () => {
      const nextButton = screen.getByText('Next Step');

      act(() => userEvent.click(nextButton));

      const addressesTitle = screen.getByText('Your addresses');
      expect(addressesTitle).toBeInTheDocument();
    });
  });

  describe('error flow', () => {
    const handlers = [
      rest.get('/users/address', (_, res, ctx) => res(ctx.status(500))),
      rest.get('/users/payment', (_, res, ctx) => res(ctx.status(500))),
    ];

    setupHttpMocks(handlers);

    beforeEach(async () => {
      renderWithProviders(renderOptions);
      await act(() => Promise.resolve());
    });

    it('should render error content', () => {
      const errorEl = screen.getByTestId('error');
      expect(errorEl).toBeInTheDocument();
    });
  });
});
