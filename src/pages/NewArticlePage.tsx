import React from 'react';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { ArticleForm } from '../containers/ArticleForm/ArticleForm';

export const NewArticlePage: React.FC = () => {
  const [cookie] = useCookies();
  if (!cookie.token) {
    return <Redirect to="sign-in" />;
  }
  return <ArticleForm />;
};
