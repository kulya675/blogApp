import { SET_CURRENT_USER, LOG_IN, LOG_OUT, UPDATE_USER } from '../actionTypes';
import type { UserActionType, UserStateType } from '../../@types/index';

const initialState: UserStateType = {
  user: {
    avatar: '',
    username: '',
    email: '',
  },
  isLoggedIn: false,
};

export default (state = initialState, action: UserActionType): UserStateType => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { isLoggedIn: true, user: action.payload };
    case LOG_IN:
      return { isLoggedIn: true, user: action.payload };
    case LOG_OUT:
      return { ...initialState };
    case UPDATE_USER:
      // eslint-disable-next-line no-case-declarations
      const newUser = { ...state.user, ...action.payload };
      return { ...state, user: newUser };
    default:
      return state;
  }
};
