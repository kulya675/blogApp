import React from 'react';

import { ArticlesList } from '../containers/ArticlesList/ArticlesList';

export const ArticlesPage: React.FC = () => {
  return <ArticlesList myArticles={false} />;
};
