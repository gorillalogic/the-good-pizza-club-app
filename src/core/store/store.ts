import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import snackbarReducer from './slices/snackbar';

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
