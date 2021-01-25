import React from 'react';
import { format } from 'date-fns';
import { Chip } from '@material-ui/core';
import type { TextReductionType, TransformArticleDataType } from '../@types/index';

export const textReduction: TextReductionType = (target, limit) => {
  let text = target;
  let lastSpace = 0;
  const symLimit = limit;

  if (text.length <= symLimit) return text;

  text = text.slice(0, symLimit);
  lastSpace = text.lastIndexOf(' ');
  text = text.substr(0, lastSpace);

  return `${text} ...`;
};

export const transfromArticleData: TransformArticleDataType = (data) => {
  const { author, createdAt, tagList, body, description, favorited, favoritesCount, slug, title } = data;
  const { username, image } = author;
  const date = format(new Date(createdAt), 'LLLL d, y');

  const tags = tagList.map((tag) => <Chip key={tag} label={tag} size="small" variant="outlined" />);
  return {
    username,
    image,
    date,
    tags,
    body,
    description: textReduction(description, 200),
    favorited,
    favoritesCount,
    slug,
    title: textReduction(title, 70),
  };
};
