import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MOCK_USER } from '../../../mocks/auth';
import { MOCK_PRODUCTS } from '../../../mocks/products';
import { MOCK_PROMOTIONS } from '../../../mocks/promotions';
import { MOCK_RECORDS } from '../../../mocks/records';
import { renderWithProviders, setupHttpMocks } from '../../utils/test';

describe('RegisterFormComponent', () => {
  describe('success flow', () => {
    const handlers = [
      rest.post('/auth/register', (_, res, ctx) => res(ctx.json(MOCK_USER))),
      rest.get('/products', (_, res, ctx) => res(ctx.json(MOCK_PRODUCTS))),
      rest.get('/promotions', (_, res, ctx) => res(ctx.json(MOCK_PROMOTIONS))),
      rest.get('/records', (_, res, ctx) => res(ctx.json(MOCK_RECORDS))),
    ];

    setupHttpMocks(handlers);

    beforeEach(async () => {
      renderWithProviders({
        route: '/register',
      });

      await act(() => Promise.resolve());
    });

    it('should render register form', () => {
      const formEl = screen.getByTestId('register-form');
      expect(formEl).toBeInTheDocument();
    });

    it('should navigate to home page on form submit', async () => {
      const [emailInputEl, passInputEl, nameInputEl, phoneInputEl] =
        screen.getAllByRole('input');
      const submitButton = screen.getByText('Sign up');

      await act(
        () =>
          new Promise<void>((resolve) => {
            userEvent.type(emailInputEl, 'test@test.com');
            userEvent.type(passInputEl, '1234');
            userEvent.type(nameInputEl, 'test');
            userEvent.type(phoneInputEl, '+1111');
            userEvent.click(submitButton);
            resolve();
          })
      );

      const homePageEl = screen.getByTestId('home-page');
      expect(homePageEl).toBeInTheDocument();
    });
  });

  describe('error flow', () => {
    const handlers = [
      rest.post('/auth/register', (_, res, ctx) => res(ctx.status(500))),
    ];

    setupHttpMocks(handlers);

    beforeEach(async () => {
      renderWithProviders({
        route: '/register',
      });

      await act(() => Promise.resolve());
    });

    it('should display snackbar on register error', async () => {
      const [emailInputEl, passInputEl, nameInputEl, phoneInputEl] =
        screen.getAllByRole('input');
      const submitButton = screen.getByText('Sign up');

      await act(
        () =>
          new Promise<void>((resolve) => {
            userEvent.type(emailInputEl, 'test@test.com');
            userEvent.type(passInputEl, '1234');
            userEvent.type(nameInputEl, 'test');
            userEvent.type(phoneInputEl, '+1111');
            userEvent.click(submitButton);
            resolve();
          })
      );

      const snackbarEl = screen.getByTestId('snackbar');
      expect(snackbarEl).toBeInTheDocument();
    });
  });
});
