// src/redux/store.js
import { combineReducers } from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import contractReducer from './reducers/contractReducer';
import invoiceReducer from './reducers/invoiceReducer';
import formReducer from './reducers/formReducer';
import ticketReducer from './reducers/ticketReducer';
import planReducer from './reducers/planReducer';
import bcvReducer from './reducers/bcvReducer';

const rootReducer = combineReducers({
  contractState: contractReducer,
  invoiceState:invoiceReducer,
  formState:formReducer,
  ticketState:ticketReducer,
  planState:planReducer,
  bcvState:bcvReducer,
});

const store = configureStore({
    reducer: rootReducer
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch