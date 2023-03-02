import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../../models/User';
import { loginAsync, logoutAsync, registerAsync } from './asyncThunks';

interface InitialState {
  isLoggedIn: boolean;
  user: Partial<User> | null;
}

const initialState: InitialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    });
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
