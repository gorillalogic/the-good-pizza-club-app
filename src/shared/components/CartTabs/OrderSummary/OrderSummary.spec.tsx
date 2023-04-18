import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MOCK_ADDRESSES } from '../../../../mocks/addresses';
import { MOCK_AUTH } from '../../../../mocks/auth';
import { MOCK_CART } from '../../../../mocks/cart';
import { MOCK_GOOGLE_MAPS } from '../../../../mocks/maps';
import { MOCK_PAYMENTS } from '../../../../mocks/payments';
import { renderWithProviders, setupHttpMocks } from '../../../utils/test';

global.google = MOCK_GOOGLE_MAPS;
jest.mock('../../../../core/hooks/useScrollToRef', () => ({
  __esModule: true,
  default: () => {
    return {
      scrollTo: jest.fn(),
    };
  },
}));

describe('OrderSummaryComponent', () => {
  const handlers = [
    rest.get('/users/address', (_, res, ctx) => res(ctx.json(MOCK_ADDRESSES))),
    rest.get('/users/payment', (_, res, ctx) => res(ctx.json(MOCK_PAYMENTS))),
  ];

  setupHttpMocks(handlers);

  beforeEach(async () => {
    renderWithProviders({
      route: '/cart',
      preloadedState: {
        auth: MOCK_AUTH,
        cart: {
          ...MOCK_CART,
          selectedAddress: MOCK_ADDRESSES[0],
          selectedPayment: MOCK_PAYMENTS[0],
        },
      },
    });

    await waitForElementToBeRemoved(screen.getByTestId('loader'));
    const summaryTab = screen.getByTestId('summary-tab');
    await waitFor(() => userEvent.click(summaryTab));
  });

  it('should render Order Summary component', () => {
    const orderSummary = screen.getByTestId('order-summary');
    expect(orderSummary).toBeInTheDocument();
  });

  it('should navigate to order placed page', async () => {
    const button = screen.getByText(/place order/i);

    await waitFor(() => userEvent.click(button));

    const orderPlaced = screen.getByTestId('order-placed');
    expect(orderPlaced).toBeInTheDocument();
  });
});
