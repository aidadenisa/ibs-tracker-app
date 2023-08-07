import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthInput } from '../types';

const authSlice = createSlice({
  name: 'auth',
  initialState: { email: '', otp: '' } as AuthInput,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      return { email: action.payload, otp: state.otp };
    }
  }
})

export const { setEmail } = authSlice.actions;
export default authSlice.reducer;