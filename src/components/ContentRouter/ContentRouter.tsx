import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import {
  ArticlesPage,
  SlugPage,
  MyArticlesPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
  NewArticlePage,
  EditArticlePage,
} from '../../pages';

import styles from './ContentRouter.module.scss';

export const ContentRouter: React.FC = () => {
  return (
    <main className={styles.main}>
      <Switch>
        <Route path="/sign-up">
          <SignUpPage />
        </Route>
        <Route path="/sign-in">
          <SignInPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>

        <Route path="/articles" exact>
          <ArticlesPage />
        </Route>
        <Route path="/my-articles" exact>
          <MyArticlesPage />
        </Route>
        <Route path="/articles/:slugId/edit">
          <EditArticlePage />
        </Route>
        <Route path="/articles/:slugId?" exact>
          <SlugPage />
        </Route>
        <Route path="/new-article">
          <NewArticlePage />
        </Route>
        <Redirect from="/" to="/articles" />
      </Switch>
    </main>
  );
};
