import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Category } from '@/types';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [] as Array<Category>,
  reducers: {
    setCategories(_, action: PayloadAction<Category[]>) {
      return action.payload;
    },
  }
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;