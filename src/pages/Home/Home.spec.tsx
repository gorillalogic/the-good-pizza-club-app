import { screen } from '@testing-library/dom';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { CustomizeDialogProvider } from '../../core/context/customizeDialogCtx';
import { AppStore } from '../../core/store/store';
import { PRODUCTS } from '../../mocks/products';
import { PROMOTIONS } from '../../mocks/promotions';
import { RECORDS } from '../../mocks/records';
import { renderWithProviders, setupHttpMocks } from '../../shared/utils/test';
import Home from './Home';

describe('HomePage', () => {
  let store: AppStore;

  const handlers = [
    rest.get('/products', (req, res, ctx) => res(ctx.json(PRODUCTS))),
    rest.get('/promotions', (req, res, ctx) => res(ctx.json(PROMOTIONS))),
    rest.get('/records', (req, res, ctx) => res(ctx.json(RECORDS))),
  ];

  setupHttpMocks(handlers);

  beforeEach(async () => {
    const { store: appStore } = renderWithProviders(
      <CustomizeDialogProvider>
        <Home />
      </CustomizeDialogProvider>
    );
    store = appStore;
    await act(() => Promise.resolve());
  });

  it('should render Home page', () => {
    const title = screen.getByText('Pizza?');
    expect(title).toBeInTheDocument();
  });

  it('should add product to cart on promotion click', () => {
    const promotionEl = screen.getAllByTestId('promotion-card')[0];
    const button = promotionEl.querySelector('button') as Element;

    userEvent.click(button);
    const state = store.getState();

    expect(state.cart.items.length).toBeGreaterThan(0);
  });

  it('should open customize dialog', () => {
    const openDialogButton = screen.getByText('Customize Your Own');

    userEvent.click(openDialogButton);
    const dialog = screen.getByRole('dialog');

    expect(dialog).toBeInTheDocument();
  });
});
