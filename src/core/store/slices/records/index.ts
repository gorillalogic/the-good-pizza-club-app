import { createSlice } from '@reduxjs/toolkit';
import { IdTypedObject } from '../../../../models/Base';
import { fetchRecords } from './asyncThunks';

interface RecordsState {
  records: IdTypedObject[];
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
