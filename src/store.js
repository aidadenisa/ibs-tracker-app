import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';

const store = configureStore({
  reducer: {
    user: userReducer,
  }
})

// I did this export because sometimes I need to import store in js files 
// This should NOT be done on server side rendering (ssr)
export default store;
