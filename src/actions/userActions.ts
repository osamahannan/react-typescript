import { ResetUserDetailsAction, SetUserDetailsAction, UserActionTypes } from '../reducers/userReducer';
import { AddUserDetailsAction, UserData } from '../reducers/userListReducer';

export interface UserDetails {
  name?: string;
  age?: number;
  sex?: string;
  mobile?: string;
  idType?: string;
  idNumber?: string;
}

export type UserActions = SetUserDetailsAction | ResetUserDetailsAction | AddUserDetailsAction | UserActionTypes;

export const setUserDetails = (userDetails: UserDetails): SetUserDetailsAction => ({
  type: 'SET_USER_DETAILS',
  payload: userDetails,
});

export const resetUserDetails = (): ResetUserDetailsAction => ({
  type: 'RESET_USER_DETAILS',
});

export const addUserList = (userData: UserData): AddUserDetailsAction => ({
  type: 'ADD_USER_LIST',
  payload: userData,
});
