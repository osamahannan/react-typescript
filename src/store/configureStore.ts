import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import userListReducer from '../reducers/userListReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  userList: userListReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
