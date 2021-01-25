import { ThunkAction } from 'redux-thunk';
import { setCurrentUser } from '../actions/userActions';
import type { RootStateType } from '../rootReducer';
import type { UserActionType, UserResponseType } from '../../@types';
import blogApi from '../../service/api';

export const getCurrentUser = (authToken: string): ThunkAction<void, RootStateType, null, UserActionType> => {
  return async (disapatch): Promise<void> => {
    await blogApi
      .getCurrentUser(authToken)
      .then(({ user }: UserResponseType) => {
        const { image, email, username } = user;
        disapatch(setCurrentUser({ avatar: image, email, username }));
      })
      .catch(() => {});
  };
};
