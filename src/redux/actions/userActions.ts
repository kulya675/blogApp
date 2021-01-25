import { SET_CURRENT_USER, LOG_IN, LOG_OUT, UPDATE_USER } from '../actionTypes';
import type {
  UserResponseType,
  LogInActionType,
  LogOutActionType,
  UpdateUserActionType,
  SetCurrentUserActionType,
  UserType,
} from '../../@types/index';

export const logIn = ({ user }: UserResponseType): LogInActionType => {
  const { image, username, email } = user;
  return {
    type: LOG_IN,
    payload: {
      avatar: image,
      email,
      username,
    },
  };
};

export const logOut = (): LogOutActionType => {
  return {
    type: LOG_OUT,
  };
};

export const updateUser = ({ user }: UserResponseType): UpdateUserActionType => {
  const { image, username, email } = user;
  return {
    type: UPDATE_USER,
    payload: {
      avatar: image,
      email,
      username,
    },
  };
};

export const setCurrentUser = (user: UserType): SetCurrentUserActionType => {
  const { avatar: image, email, username } = user;
  return {
    type: SET_CURRENT_USER,
    payload: {
      avatar: image,
      username,
      email,
    },
  };
};
