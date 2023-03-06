import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import promotionsReducer from './slices/promotions';
import snackbarReducer from './slices/snackbar';

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    auth: authReducer,
    promotions: promotionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
