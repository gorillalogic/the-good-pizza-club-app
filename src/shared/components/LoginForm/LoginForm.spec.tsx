import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MOCK_USER } from '../../../mocks/auth';
import { MOCK_PRODUCTS } from '../../../mocks/products';
import { MOCK_PROMOTIONS } from '../../../mocks/promotions';
import { MOCK_RECORDS } from '../../../mocks/records';
import { renderWithProviders, setupHttpMocks } from '../../utils/test';

describe('LoginFormComponent', () => {
  describe('success flow', () => {
    const handlers = [
      rest.post('/auth/login', (_, res, ctx) => res(ctx.json(MOCK_USER))),
      rest.get('/products', (_, res, ctx) => res(ctx.json(MOCK_PRODUCTS))),
      rest.get('/promotions', (_, res, ctx) => res(ctx.json(MOCK_PROMOTIONS))),
      rest.get('/records', (_, res, ctx) => res(ctx.json(MOCK_RECORDS))),
    ];

    setupHttpMocks(handlers);

    beforeEach(() => {
      renderWithProviders({
        route: '/login',
      });
    });

    it('should render login form', () => {
      const formEl = screen.getByTestId('login-form');
      expect(formEl).toBeInTheDocument();
    });

    it('should navigate to home page on form submit', async () => {
      const [emailInputEl, passInputEl] = screen.getAllByRole('input');
      const submitButton = screen.getByText('Log in');

      userEvent.type(emailInputEl, 'test@test.com');
      userEvent.type(passInputEl, '1234');
      userEvent.click(submitButton);

      waitFor(() => {
        const homePageEl = screen.getByTestId('home-page');
        expect(homePageEl).toBeInTheDocument();
      });
    });
  });

  describe('error flow', () => {
    const handlers = [
      rest.post('/auth/login', (_, res, ctx) => res(ctx.status(500))),
    ];

    setupHttpMocks(handlers);

    beforeEach(() => {
      renderWithProviders({
        route: '/login',
      });
    });

    it('should display snackbar on login error', async () => {
      const [emailInputEl, passInputEl] = screen.getAllByRole('input');
      const submitButton = screen.getByText('Log in');

      userEvent.type(emailInputEl, 'test@test.com');
      userEvent.type(passInputEl, '1234');
      userEvent.click(submitButton);

      waitFor(() => {
        const snackbarEl = screen.getByTestId('snackbar');
        expect(snackbarEl).toBeInTheDocument();
      });
    });
  });
});
