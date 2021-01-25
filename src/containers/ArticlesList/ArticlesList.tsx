import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { AxiosError } from 'axios';

import { Pagination } from '@material-ui/lab';
import { ResponseStatus } from '../../components/ResponseStatus/ResponseStatus';

import blodApi from '../../service/api';

import { userSelector } from '../../redux/selectors';
import { articleCreator } from '../../tools/articleCreator';

import type { ArticlesResponseType, ArticleType } from '../../@types/index';

import styles from './ArticleList.module.scss';

export const ArticlesList: React.FC<{ myArticles: boolean }> = ({ myArticles }) => {
  const { user } = useSelector(userSelector);
  const [articlesList, setArticlesList] = useState<ArticleType[] | null>(null);
  const [articlesToRender, setArticlesToRender] = useState<React.ReactElement[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articlesCounter, setArticlesCounter] = useState<number>(0);
  const [articlesPending, setArticlesPending] = useState<boolean>(true);
  const [responseErrorStatus, setResponseErrorStatus] = useState<number | null>(null);
  const [cookie] = useCookies();

  useEffect(() => {
    const author = myArticles ? user.username : '';
    setArticlesPending(true);
    setArticlesToRender(null);
    blodApi
      .getArticles(currentPage * 20, cookie.token, author)
      .then(({ articles, articlesCount }: ArticlesResponseType) => {
        setArticlesPending(false);
        setArticlesList(articles);
        setArticlesCounter(articlesCount);
      })
      .catch(({ response }: AxiosError) => {
        if (response) {
          setArticlesPending(false);
          setResponseErrorStatus(response.status);
        }
      });
  }, [currentPage, cookie.token, user.username, myArticles]);

  useEffect(() => {
    if (articlesList !== null) {
      setArticlesToRender(
        articlesList.map((article) => {
          return (
            <li key={article.slug} className={styles.item}>
              {articleCreator(article, false, user)}
            </li>
          );
        })
      );
    }
  }, [articlesList, user]);

  const changeCurrentPageHandler = (event: any, page: number): void => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  return (
    <>
      <ResponseStatus loading={articlesPending} errorStatus={responseErrorStatus}>
        <ul className={styles.list}>{articlesToRender}</ul>
      </ResponseStatus>
      {!articlesPending && !responseErrorStatus && (
        <Pagination count={Math.ceil(articlesCounter / 20)} page={currentPage} onChange={changeCurrentPageHandler} />
      )}
    </>
  );
};
