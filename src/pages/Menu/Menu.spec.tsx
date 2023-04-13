import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MOCK_PRODUCTS } from '../../mocks/products';
import { MOCK_PROMOTIONS } from '../../mocks/promotions';
import { MOCK_RECORDS } from '../../mocks/records';
import { renderWithProviders } from '../../shared/utils/test';

describe('MenuPage', () => {
  beforeEach(() => {
    renderWithProviders({
      route: '/menu',
      preloadedState: {
        auth: {
          isLoggedIn: true,
          user: null,
        },
        products: {
          products: MOCK_PRODUCTS,
        },
        promotions: {
          promotions: MOCK_PROMOTIONS,
        },
        records: {
          records: MOCK_RECORDS,
        },
      },
    });
  });

  it('should render Menu page', () => {
    const title = screen.getByText('OUR MOST BELOVED MENU');
    const subtitle = screen.getByText('Our repertoire');

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('should add product to cart on promotion click', () => {
    const promotionEl = screen.getAllByTestId('promotion-card')[0];
    const button = promotionEl.querySelector('button') as Element;

    userEvent.click(button);

    waitFor(() => {
      const cartItemsEl = screen.queryByTestId('cart-items');
      expect(cartItemsEl).toBeInTheDocument();
    });
  });

  it('should open customize dialog on product click', () => {
    const productEl = screen.getAllByTestId('product-card')[0];
    const button = productEl.querySelector('button') as Element;

    userEvent.click(button);

    waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });
});
