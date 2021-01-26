/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';

import { Button, Avatar, makeStyles } from '@material-ui/core';
import { DropdownMenu } from '../../components/DropdownMenu/DropdownMenu';

import { userSelector } from '../../redux/selectors';
import { logOut } from '../../redux/actions/userActions';
import { getCurrentUser } from '../../redux/thunkActions/userThunkAction';

import avatar from './avatar.svg';
import styles from './Header.module.scss';

const useStyles = makeStyles({
  button: {
    borderRadius: 3,
    fontSize: 16,
    textTransform: 'none',
    textDecoration: 'none',
  },
  avatar: {
    marginLeft: 13,
    width: 46,
    height: 46,
  },
});

export const Header: React.FC = () => {
  const { isLoggedIn, user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cookie, , removeCookie] = useCookies(['token']);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (cookie.token) {
      dispatch(getCurrentUser(cookie.token));
    }
  }, [cookie.token, dispatch]);

  const openDropdownHandler = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdownHandler = () => {
    setAnchorEl(null);
  };

  const logOutHandler = () => {
    removeCookie('token', { path: '/' });
    dispatch(logOut());
    history.push('/');
  };

  const loggedInRightSide = (
    <>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Button className={classes.button} size="small" color="secondary" variant="outlined">
            <Link to="/new-article">Create article</Link>
          </Button>
        </li>
        <li className={styles.item}>
          <div onClick={openDropdownHandler}>
            <span className={styles.username}>{user.username}</span>
            <Avatar className={classes.avatar} src={!user.avatar ? avatar : user.avatar} alt={user.username} />
          </div>
          <DropdownMenu
            anchorEl={anchorEl}
            onClose={closeDropdownHandler}
            closeHandler={closeDropdownHandler}
            open={Boolean(anchorEl)}
            onLogout={logOutHandler}
          />
        </li>
      </ul>
    </>
  );

  const loggedOutRightSide = (
    <>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Button className={classes.button} size="large">
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </li>
        <li className={styles.item}>
          <Button className={classes.button} size="large" color="primary" variant="outlined">
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </li>
      </ul>
    </>
  );

  const rightSide = isLoggedIn ? loggedInRightSide : loggedOutRightSide;

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1>
          <Link className={styles.link} to="/">
            Blog
          </Link>
        </h1>
        {rightSide}
      </div>
    </header>
  );
};
