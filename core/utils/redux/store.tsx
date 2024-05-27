// src/redux/store.js
import { combineReducers } from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import contractReducer from './reducers/contractReducer';

const rootReducer = combineReducers({
  contractState: contractReducer,
});

const store = configureStore({
    reducer: rootReducer
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch