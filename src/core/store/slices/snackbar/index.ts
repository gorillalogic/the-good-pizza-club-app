import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  isDisplay: boolean;
  color?: AlertColor;
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
    showSnackbar: (
      state,
      action: PayloadAction<{ color: AlertColor; message: string }>
    ) => {
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
