import { Reducer } from 'redux';

export interface UserData {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  idType: string;
  idNumber: string;
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  pincode?: string;
}

export interface AddUserDetailsAction {
  type: 'ADD_USER_LIST';
  payload: UserData;
}

interface UserState {
  users: UserData[];
}

const initialState: UserState = {
  users: [],
};

export type UserListActionTypes = AddUserDetailsAction;

const userListReducer: Reducer<UserState, UserListActionTypes> = (state = initialState, action): UserState => {

  switch (action.type) {
    case 'ADD_USER_LIST':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

export default userListReducer;
