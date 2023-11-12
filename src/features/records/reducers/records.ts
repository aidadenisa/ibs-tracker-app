import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DetailedRecord, Record } from '@/types';

const recordSlice = createSlice({
  name: 'records',
  initialState: [] as DetailedRecord[],
  reducers: {
    setRecords(state, action: PayloadAction<DetailedRecord[]>) {
      return action.payload;
    }
  }
})

export const {
  setRecords
} = recordSlice.actions;
export default recordSlice.reducer;