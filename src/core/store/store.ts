import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import cartReducer from './slices/cart';
import productsReducer from './slices/products';
import promotionsReducer from './slices/promotions';
import recordsReducer from './slices/records';
import snackbarReducer from './slices/snackbar';
import userReducer from './slices/user';

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  auth: authReducer,
  promotions: promotionsReducer,
  products: productsReducer,
  records: recordsReducer,
  cart: cartReducer,
  user: userReducer,
});

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export default setupStore;
