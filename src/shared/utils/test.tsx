import { PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { RequestHandler } from 'msw';
import { setupServer } from 'msw/node';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import setupStore, { AppStore, RootState } from '../../core/store/store';
import { routes } from '../../router';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  route?: string;
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithStore(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export function renderWithRouter({
  route = '/',
  ...renderOptions
}: ExtendedRenderOptions = {}) {
  window.scrollTo = jest.fn();

  const router = createMemoryRouter(routes, {
    initialEntries: [route],
  });

  const Wrapper: React.FC = () => {
    return <RouterProvider router={router} />;
  };

  return {
    ...render(<Wrapper />, { ...renderOptions }),
  };
}

export function renderWithProviders({
  route = '/',
  preloadedState = {},
  store = setupStore(preloadedState),
  ...renderOptions
}: ExtendedRenderOptions = {}) {
  window.scrollTo = jest.fn();

  const router = createMemoryRouter(routes, {
    initialEntries: [route],
  });

  const Wrapper: React.FC = () => {
    return (
      <CookiesProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </CookiesProvider>
    );
  };

  return {
    store,
    ...render(<Wrapper />, { ...renderOptions }),
  };
}

export function setupHttpMocks(handlers: RequestHandler[]) {
  const server = setupServer(...handlers);

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());
}
