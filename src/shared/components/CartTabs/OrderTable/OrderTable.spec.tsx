import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { AppStore } from '../../../../core/store/store';
import { MOCK_ADDRESSES } from '../../../../mocks/addresses';
import { MOCK_AUTH } from '../../../../mocks/auth';
import { MOCK_CART } from '../../../../mocks/cart';
import { MOCK_PAYMENTS } from '../../../../mocks/payments';
import { renderWithProviders, setupHttpMocks } from '../../../utils/test';

describe('OrderTableComponent', () => {
  let store: AppStore;
  const handlers = [
    rest.get('/users/address', (_, res, ctx) => res(ctx.json(MOCK_ADDRESSES))),
    rest.get('/users/payment', (_, res, ctx) => res(ctx.json(MOCK_PAYMENTS))),
  ];

  setupHttpMocks(handlers);

  beforeEach(async () => {
    const { store: appStore } = renderWithProviders({
      route: '/cart',
      preloadedState: {
        auth: MOCK_AUTH,
        cart: MOCK_CART,
      },
    });

    store = appStore;
    await waitForElementToBeRemoved(screen.getByTestId('loader'));
  });

  it('should render OrderTable component', () => {
    const orderTable = screen.getByTestId('order-table');
    expect(orderTable).toBeInTheDocument();
  });

  it('should increase product quantity on counter plus button click', async () => {
    const counter = screen.getByTestId('counter');
    const [, plusButton] = Array.from(counter.querySelectorAll('button'));

    userEvent.click(plusButton);

    await waitFor(() => {
      const state = store.getState();
      expect(state.cart.items[0].quantity).toEqual(2);
    });
  });

  it('should open remove modal and close it', async () => {
    const deleteButton = screen.getByTestId('product-item-delete');
    userEvent.click(deleteButton);

    const dialog = await screen.findByTestId('remove-dialog');
    expect(dialog).toBeInTheDocument();

    const [cancelButton] = Array.from(dialog.querySelectorAll('button'));
    userEvent.click(cancelButton);

    await waitFor(() => {
      expect(dialog).not.toBeInTheDocument();
    });
  });

  it('should open remove modal and remove product from cart on confirm', async () => {
    const deleteButton = screen.getByTestId('product-item-delete');
    userEvent.click(deleteButton);

    const dialog = await screen.findByTestId('remove-dialog');
    expect(dialog).toBeInTheDocument();

    const [, removeButton] = Array.from(dialog.querySelectorAll('button'));
    userEvent.click(removeButton);

    const noItemsEl = await screen.findByText(/no products in your cart/i);
    expect(noItemsEl).toBeInTheDocument();
  });
});
