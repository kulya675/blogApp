import React from 'react';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { ArticlesList } from '../containers/ArticlesList/ArticlesList';

export const MyArticlesPage: React.FC = () => {
  const [cookie] = useCookies();
  if (!cookie.token) {
    return <Redirect to="sign-in" />;
  }
  return <ArticlesList myArticles />;
};
