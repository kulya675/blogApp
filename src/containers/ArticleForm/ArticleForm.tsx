import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useHistory, useParams } from 'react-router-dom';

import { AxiosError } from 'axios';

import { ResponseStatus } from '../../components/ResponseStatus/ResponseStatus';
import { ArticleFormFields } from '../../components/ArticleFormFields/ArticleFormFields';

import blogApi from '../../service/api';

import type { RouteParamsType, SlugResponseType, ArticleType, ArticleFormType } from '../../@types/index';

export const ArticleForm: React.FC = () => {
  const [currentArticle, setCurrentArticle] = useState<ArticleType | null>(null);
  const [tagList, setTagList] = useState<string[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [dataPending, setDataPending] = useState<boolean>(true);
  const [responseErrorStatus, setResponseErrorStatus] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit } = useForm();
  const { slugId } = useParams<RouteParamsType>();
  const history = useHistory();
  const [cookie] = useCookies();
  const type = slugId ? 'edit' : 'create';

  useEffect(() => {
    if (!slugId) {
      setDataPending(false);
      setCurrentArticle(null);
    } else {
      blogApi
        .getSlug(slugId, undefined)
        .then(({ article }: SlugResponseType) => {
          setDataPending(false);
          setCurrentArticle(article);
        })
        .catch(({ response }: AxiosError) => {
          if (response) {
            setDataPending(false);
            setResponseErrorStatus(response.status);
          }
        });
    }
  }, [slugId]);

  const submitHandler: SubmitHandler<ArticleFormType> = (body) => {
    const submitedData = { ...body, tagList };
    setButtonDisabled(true);
    if (type === 'create') {
      blogApi
        .createArticle(submitedData, cookie.token)
        .then((response: SlugResponseType) => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { article } = response;
          setButtonDisabled(false);
          history.push(`/articles/${article.slug}`);
        })
        .catch(({ response }: AxiosError) => {
          if (response) {
            setButtonDisabled(false);
            setResponseErrorStatus(response.status);
          }
        });
    } else {
      blogApi
        .updateArticle(submitedData, slugId, cookie.token)
        .then((response: SlugResponseType) => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { article } = response;
          setButtonDisabled(false);
          history.push(`/articles/${article.slug}`);
        })
        .catch(({ response }: AxiosError) => {
          if (response) {
            setButtonDisabled(false);
            setResponseErrorStatus(response.status);
          }
        });
    }
  };

  const changeTagsValuesHandler = (event: any, value: any) => {
    setTagList(value);
  };

  return (
    <>
      <ResponseStatus errorStatus={responseErrorStatus} loading={dataPending}>
        <ArticleFormFields
          article={currentArticle}
          type={type}
          ref={register}
          onSubit={handleSubmit(submitHandler)}
          onTagsValuesChange={changeTagsValuesHandler}
          buttonDisabled={buttonDisabled}
        />
      </ResponseStatus>
    </>
  );
};
