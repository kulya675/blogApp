/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { AxiosError } from 'axios';

import { FavoriteBorder, Favorite } from '@material-ui/icons';

import blogApi from '../../service/api';

import styles from './LikeButton.module.scss';

type LikeButtonPropsType = {
  favoritesCount: number;
  favorited: boolean;
  slug: string;
};

export const LikeButton: React.FC<LikeButtonPropsType> = ({ favorited, favoritesCount, slug }) => {
  const [liked, setLiked] = React.useState<boolean>(favorited);
  const [likeCounter, setLikeCounter] = React.useState<number>(favoritesCount);
  const [cookie] = useCookies();

  useEffect(() => {
    setLiked(favorited);
    setLikeCounter(favoritesCount);
  }, [favorited, favoritesCount]);

  const favoriteClickHandler = (): void => {
    const action = favorited ? 'unfav' : 'fav';
    if (!cookie.token) return;
    setLiked(!liked);
    setLikeCounter(!liked ? likeCounter + 1 : likeCounter - 1);
    blogApi
      .favouriteArticle(action, slug, cookie.token)
      .then(() => {})
      .catch(({ response }: AxiosError) => {
        if (response) {
          setLiked(!liked);
          setLikeCounter(!liked ? likeCounter + 1 : likeCounter - 1);
        }
      });
  };

  return (
    <div className={cookie.token ? `${styles.like} ${styles.loggedIn}` : styles.like} onClick={favoriteClickHandler}>
      {liked ? <Favorite color="error" /> : <FavoriteBorder />}
      {!!likeCounter && <span className={styles.likeCounter}>{likeCounter}</span>}
    </div>
  );
};
