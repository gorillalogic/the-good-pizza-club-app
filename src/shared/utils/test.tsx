import { PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { RequestHandler } from 'msw';
import { setupServer } from 'msw/node';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import setupStore, { AppStore, RootState } from '../../core/store/store';
import Layout from '../layout/Layout';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
      <CookiesProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Layout>{children}</Layout>
          </BrowserRouter>
        </Provider>
      </CookiesProvider>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
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
