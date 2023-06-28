import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const currentDaySlice = createSlice({
  name: 'currentDay',
  initialState: (new Date()).toISOString(),
  reducers: {
    setCurrentDay(state, action: PayloadAction<string>) {
      return action.payload;
    }
  }
})

export const { setCurrentDay } = currentDaySlice.actions;
export default currentDaySlice.reducer;