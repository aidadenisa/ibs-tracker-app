import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Record } from '@/types';

const recordSlice = createSlice({
  name: 'records',
  initialState: [] as Record[],
  reducers: {
    setRecords(state, action: PayloadAction<Record[]>) {
      return action.payload;
    }
  }
})

export const {
  setRecords
} = recordSlice.actions;
export default recordSlice.reducer;