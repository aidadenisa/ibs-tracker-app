// const userReducer = (state = {}, action) => {
//   if(action.type === 'LOG_USER') {
//     return action.payload;
//   }
//   return state;
// }

// export default userReducer;

// // CREATOR FUNCTIONS

// export const setUserInfo = (userInfo = {}) => {
//   return {
//     type: 'LOG_USER',
//     payload: userInfo
//   };
// }

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

const userSlice = createSlice({
  name: 'user',
  initialState: {} as User,
  reducers: {
    setUserInfo(state, action: PayloadAction<User>) {
      return action.payload;
    },
  }
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;