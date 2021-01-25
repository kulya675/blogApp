import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { AxiosError } from 'axios';
import blogApi from '../../service/api';

import { ResponseStatus } from '../../components/ResponseStatus/ResponseStatus';
import { articleCreator } from '../../tools/articleCreator';
import { userSelector } from '../../redux/selectors';

import type { RouteParamsType, SlugResponseType } from '../../@types';

export const Slug: React.FC = () => {
  const { user } = useSelector(userSelector);
  const [slug, setSlug] = useState<React.ReactElement | null>(null);
  const [articlePending, setArticlePending] = useState<boolean>(false);
  const [responseErrorStatus, setResponseErrorStatus] = useState<number | null>(null);
  const [cookie] = useCookies();
  const { slugId } = useParams<RouteParamsType>();

  useEffect(() => {
    setArticlePending(true);
    blogApi
      .getSlug(slugId, cookie.token)
      .then(({ article }: SlugResponseType) => {
        setSlug(articleCreator(article, true, user));
        setArticlePending(false);
      })
      .catch(({ response }: AxiosError) => {
        if (response) {
          setArticlePending(false);
          setResponseErrorStatus(response.status);
        }
      });
  }, [slugId, user, cookie.token]);

  return (
    <>
      <ResponseStatus errorStatus={responseErrorStatus} loading={articlePending}>
        {slug}
      </ResponseStatus>
    </>
  );
};
