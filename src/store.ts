import { configureStore } from '@reduxjs/toolkit';
import recordsReducer from '@/features/records/reducers/records';
import categoriesReducer from '@/features/records/reducers/categories';
import eventsReducer from '@/features/records/reducers/events';
import currentDayReducer from '@/features/dayReport/reducers/currentDay';
import authReducer from '@/features/auth/reducers/auth';

const store = configureStore({
  reducer: {
    records: recordsReducer,
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
