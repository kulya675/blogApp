import React from 'react';

import { ArticleBody } from '../ArticleBody/ArticleBody';
import { ArticleHeader } from '../ArticleHeader/ArticleHeader';

import type { ArticleContainerPropsType } from '../../@types/index';

import styles from './ArticleComponent.module.scss';

export const ArticleComponent: React.FC<ArticleContainerPropsType> = ({
  body,
  date,
  description,
  favorited,
  favoritesCount,
  image,
  isSlug,
  owner,
  slug,
  tags,
  title,
  username,
}) => {
  return (
    <article className={styles.article}>
      <ArticleHeader
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
      />
      {isSlug && <ArticleBody body={body} />}
    </article>
  );
};
