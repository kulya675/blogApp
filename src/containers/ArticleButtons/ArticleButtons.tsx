import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useHistory, useParams } from 'react-router-dom';

import { Button, Popover } from '@material-ui/core';

import blogApi from '../../service/api';

import type { RouteParamsType } from '../../@types/index';

import styles from './ArticleButtons.module.scss';

type ArticleButtonsPropsType = {
  slug: string;
};

export const ArticleButtons: React.FC<ArticleButtonsPropsType> = ({ slug }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const { slugId } = useParams<RouteParamsType>();
  const history = useHistory();
  const [cookie] = useCookies();

  const openPopoverHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const closePopoverHandler = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const deleteArticleHandler = () => {
    blogApi
      .deleteArticle(slug, cookie.token)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button className={styles.button} variant="outlined" size="medium" color="secondary" onClick={openPopoverHandler}>
        Delete
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={closePopoverHandler}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={styles.popover}>
          <span>Are you sure to delete this article?</span>
          <div className={styles.buttons}>
            <Button variant="outlined" size="small" onClick={closePopoverHandler}>
              No
            </Button>
            <Button variant="outlined" size="small" color="secondary" onClick={deleteArticleHandler}>
              Yes
            </Button>
          </div>
        </div>
      </Popover>
      <Button className={styles.button} variant="outlined" size="medium" color="primary">
        <Link to={`/articles/${slug}/edit`}>Edit</Link>
      </Button>
    </>
  );
};
