import { combineReducers } from 'redux';

import userReducer from './reducers/userReducer';

export const rootReducer = combineReducers({
  userState: userReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
