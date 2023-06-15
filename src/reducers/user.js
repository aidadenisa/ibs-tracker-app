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

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUserInfo(state, action) {
      return action.payload;
    },
  }
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;