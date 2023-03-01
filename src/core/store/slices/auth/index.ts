import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../../models/User';
import { loginAsync, logoutAsync } from './asyncThunks';

interface InitialState {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: Partial<User> | null;
}

const initialState: InitialState = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    });
    builder.addCase(logoutAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

export default authSlice.reducer;
