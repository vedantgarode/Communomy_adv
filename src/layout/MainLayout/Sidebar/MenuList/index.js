import React from 'react';

// material-ui
// import { Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useUserAuth } from 'context/UserAuthContext';

// ==============================|| MENULIST ||============================== //

const MenuList = () => {
  const { user } = useUserAuth();
  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      case user.displayName:
        return <NavGroup key={item.id} item={item} />;
    }
  });

  return navItems;
};

export default MenuList;
