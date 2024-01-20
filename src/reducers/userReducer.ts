import { Reducer } from 'redux';
import { UserDetails } from '../actions/userActions';

interface UserState {
  userDetails: {
    name: string;
    age: number;
    sex: string;
    mobile: string;
    idType: string;
    idNumber: string;
  };
}

const initialState: UserState = {
  userDetails: {
    name: '',
    age: 1,
    sex: '',
    mobile: '',
    idType: '',
    idNumber: '',
  },
};

export interface SetUserDetailsAction {
  type: 'SET_USER_DETAILS';
  payload: UserDetails;
}

export interface ResetUserDetailsAction {
  type: 'RESET_USER_DETAILS';
}

export type UserActionTypes = SetUserDetailsAction | ResetUserDetailsAction;

const userReducer: Reducer<UserState, UserActionTypes> = (state = initialState, action): UserState => {

  console.log("action =", action)
  
  switch (action.type) {
    case 'SET_USER_DETAILS':
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          ...action.payload
        },
      };
    case 'RESET_USER_DETAILS':
      return {
        ...state,
        userDetails: initialState.userDetails
      };
    default:
      return state;
  }
};

export default userReducer;
