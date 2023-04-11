import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomizeDialogProvider } from '../../core/context/customizeDialogCtx';
import { AppStore } from '../../core/store/store';
import { PRODUCTS } from '../../mocks/products';
import { PROMOTIONS } from '../../mocks/promotions';
import { RECORDS } from '../../mocks/records';
import { renderWithProviders } from '../../shared/utils/test';
import Menu from './Menu';

describe('MenuPage', () => {
  let store: AppStore;

  beforeEach(async () => {
    const { store: appStore } = renderWithProviders(
      <CustomizeDialogProvider>
        <Menu />
      </CustomizeDialogProvider>,
      {
        preloadedState: {
          products: {
            products: PRODUCTS,
          },
          promotions: {
            promotions: PROMOTIONS,
          },
          records: {
            records: RECORDS,
          },
        },
      }
    );

    store = appStore;
    await act(() => Promise.resolve());
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
    const state = store.getState();

    expect(state.cart.items.length).toBeGreaterThan(0);
  });

  it('should open customize dialog on product click', () => {
    const productEl = screen.getAllByTestId('product-card')[0];
    const button = productEl.querySelector('button') as Element;

    userEvent.click(button);
    const dialog = screen.getByRole('dialog');

    expect(dialog).toBeInTheDocument();
  });
});
