import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { initMapLoader } from './core/lib/maps';
import store from './core/store/store';
import theme from './core/theme/theme';
import './index.scss';
import router from './router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

initMapLoader();

root.render(
  <React.StrictMode>
    <CssBaseline />

    <CookiesProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
