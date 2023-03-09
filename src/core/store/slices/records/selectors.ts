import { RootState } from '../../store';

export const recordsSelector = (state: RootState) => state.records.records;
