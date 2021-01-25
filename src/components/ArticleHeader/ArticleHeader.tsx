import React from 'react';

import { Link } from 'react-router-dom';
import { ArticleButtons } from '../../containers/ArticleButtons/ArticleButtons';
import { LikeButton } from '../../containers/LikeButton/LikeButton';

import type { ArticleHeaderPropsType } from '../../@types/index';

import styles from './ArticleHeader.module.scss';

export const ArticleHeader: React.FC<ArticleHeaderPropsType> = ({
  username,
  title,
  favorited,
  favoritesCount,
  image,
  date,
  description,
  slug,
  tags,
  owner,
}) => {
  return (
    <>
      <header className={styles.header}>
        <section className={styles.leftSide}>
          <div className={styles.head}>
            <h2 className={styles.title}>
              <Link to={`articles/${slug}`}>{title}</Link>
            </h2>
            <LikeButton favoritesCount={favoritesCount} favorited={favorited} slug={slug} />
          </div>
          <div className={styles.tags}>{tags}</div>
        </section>
        <section className={styles.rightSide}>
          <div className={styles.info}>
            <span className={styles.username}>{username}</span>
            <span className={styles.date}>{date}</span>
          </div>
          <img className={styles.avatar} src={image} alt="avatar" />
        </section>
      </header>
      <section className={styles.descriptionSection}>
        <p className={styles.description}>{description}</p>
        {owner ? <ArticleButtons slug={slug} /> : null}
      </section>
    </>
  );
};
