import { LOG_IN, LOG_OUT, UPDATE_USER, SET_CURRENT_USER } from '../../redux/actionTypes';
import { UserType } from './store';

export type LogInActionType = {
  type: typeof LOG_IN;
  payload: UserType;
};

export type LogOutActionType = {
  type: typeof LOG_OUT;
};

export type SetCurrentUserActionType = {
  type: typeof SET_CURRENT_USER;
  payload: UserType;
};

export type UpdateUserActionType = {
  type: typeof UPDATE_USER;
  payload: UserType;
};

export type UserActionType = LogInActionType | SetCurrentUserActionType | LogOutActionType | UpdateUserActionType;
