import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import categoriesReducer from './reducers/categories';
import eventsReducer from './reducers/events';
import currentDayReducer from './reducers/currentDay';
import authReducer from './reducers/auth';

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    selectedEventsIds: eventsReducer,
    currentDay: currentDayReducer,
    auth: authReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// I did this export because sometimes I need to import store in js files 
// This should NOT be done on server side rendering (ssr)
export default store;
