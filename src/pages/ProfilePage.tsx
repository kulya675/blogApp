import React from 'react';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { Profile } from '../containers/UsersForms/ProfileForm';

export const ProfilePage: React.FC = () => {
  const [cookie] = useCookies();
  if (!cookie.token) {
    return <Redirect to="sign-in" />;
  }
  return <Profile />;
};
