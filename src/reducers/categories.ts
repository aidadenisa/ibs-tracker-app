import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Category } from '../types';
import categoriesService from '../services/categories';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [] as Array<Category>,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      return action.payload;
    },
  }
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;