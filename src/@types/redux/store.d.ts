export type UserType = {
  username: string;
  email: string;
  avatar: string;
};

export type UserStateType = {
  user: UserType;
  isLoggedIn: boolean;
};
