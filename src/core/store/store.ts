import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import promotionsReducer from './slices/promotions';
import snackbarReducer from './slices/snackbar';
import productsReducer from './slices/products';
import recordsReducer from './slices/records';

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    auth: authReducer,
    promotions: promotionsReducer,
    products: productsReducer,
    records: recordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
