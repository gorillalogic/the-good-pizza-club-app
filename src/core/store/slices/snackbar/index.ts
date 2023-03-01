import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isDisplay: boolean;
  color: 'success' | 'error' | 'warning' | 'info' | undefined;
  message: string;
}

const initialState: InitialState = {
  isDisplay: false,
  color: undefined,
  message: '',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.isDisplay = true;
      state.color = action.payload.color;
      state.message = action.payload.message;
    },
    hideSnackbar: (state) => {
      state.isDisplay = false;
      state.color = undefined;
      state.message = '';
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
