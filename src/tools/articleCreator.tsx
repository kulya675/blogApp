import React from 'react';

import { ArticleComponent } from '../components/ArticleComponent/ArticleComponent';

import { transfromArticleData } from './utils';

import type { ArticleCreatorType } from '../@types';

export const articleCreator: ArticleCreatorType = (article, isSlug, user) => {
  const {
    date,
    body,
    description,
    favorited,
    favoritesCount,
    image,
    slug,
    tags,
    title,
    username,
  } = transfromArticleData(article);

  const owner = user?.username === username;

  return (
    <ArticleComponent
      date={date}
      description={description}
      favorited={favorited}
      favoritesCount={favoritesCount}
      image={image}
      owner={owner}
      slug={slug}
      tags={tags}
      title={title}
      username={username}
      body={body}
      isSlug={isSlug}
    />
  );
};
