import { createSlice } from '@reduxjs/toolkit';
import { Record } from '../../../../models/Record';
import { fetchRecords } from './asyncThunks';

interface RecordsState {
  records: Record[];
}

const initialState: RecordsState = {
  records: [],
};

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecords.fulfilled, (state, action) => {
      state.records = action.payload;
    });
  },
});

export default recordsSlice.reducer;
