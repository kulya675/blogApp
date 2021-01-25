import React from 'react';

import ReactMarkdown from 'react-markdown';

import type { ArticleBodyPropsType } from '../../@types/index';

import styles from './ArticleBody.module.scss';

export const ArticleBody: React.FC<ArticleBodyPropsType> = ({ body }) => {
  return (
    <section className={styles.body}>
      <ReactMarkdown source={body} />
    </section>
  );
};
