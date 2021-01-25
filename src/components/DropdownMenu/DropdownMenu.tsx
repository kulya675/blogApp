import React from 'react';

import { Link } from 'react-router-dom';
import { Menu, MenuItem, MenuProps } from '@material-ui/core';

type DropdownMenuPropsType = {
  onLogout: () => void;
  closeHandler: () => void;
};

export const DropdownMenu: React.FC<MenuProps & DropdownMenuPropsType> = ({
  open,
  anchorEl,
  onClose,
  closeHandler,
  onLogout,
}) => {
  return (
    <Menu
      elevation={1}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <MenuItem onClick={closeHandler}>
        <Link to="/my-articles">My posts</Link>
      </MenuItem>
      <MenuItem onClick={closeHandler}>
        <Link to="/profile">Profile</Link>
      </MenuItem>
      <MenuItem onClick={onLogout}>Logout</MenuItem>
    </Menu>
  );
};
