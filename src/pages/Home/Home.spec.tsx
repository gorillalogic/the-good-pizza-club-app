import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MOCK_PRODUCTS } from '../../mocks/products';
import { MOCK_PROMOTIONS } from '../../mocks/promotions';
import { MOCK_RECORDS } from '../../mocks/records';
import { renderWithProviders, setupHttpMocks } from '../../shared/utils/test';

describe('HomePage', () => {
  const handlers = [
    rest.get('/products', (_, res, ctx) => res(ctx.json(MOCK_PRODUCTS))),
    rest.get('/promotions', (_, res, ctx) => res(ctx.json(MOCK_PROMOTIONS))),
    rest.get('/records', (_, res, ctx) => res(ctx.json(MOCK_RECORDS))),
  ];

  setupHttpMocks(handlers);

  beforeEach(async () => {
    renderWithProviders({
      route: '/home',
      preloadedState: {
        auth: {
          isLoggedIn: true,
          user: null,
        },
      },
    });

    await waitForElementToBeRemoved(screen.getByTestId('loader'));
  });

  it('should render Home page', () => {
    const homePageEl = screen.getByTestId('home-page');
    expect(homePageEl).toBeInTheDocument();
  });

  it('should add product to cart on promotion click', () => {
    const promotionEl = screen.getAllByTestId('promotion-card')[0];
    const button = promotionEl.querySelector('button') as Element;

    userEvent.click(button);

    const cartItemsEl = screen.getByTestId('cart-items');
    expect(cartItemsEl).toBeInTheDocument();
  });

  it('should open customize dialog on product click', () => {
    const productEl = screen.getAllByTestId('product-card')[0];
    const button = productEl.querySelector('button') as Element;

    userEvent.click(button);

    waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      waitForElementToBeRemoved(screen.getByTestId('customize-dialog-loader'));
    });
  });

  it('should open customize dialog', () => {
    const openDialogButton = screen.getByText('Customize Your Own');

    userEvent.click(openDialogButton);

    waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      waitForElementToBeRemoved(screen.getByTestId('customize-dialog-loader'));
    });
  });
});
