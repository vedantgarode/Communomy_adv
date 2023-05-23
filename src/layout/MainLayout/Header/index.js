import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, IconButton } from '@mui/material';

// project import
// import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
// import NotificationSection from './NotificationSection';
import { drawerWidth } from 'config.js';
import { useUserAuth } from 'context/UserAuthContext';

// assets
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import logo from 'assets/images/communomy.png';

// ==============================|| HEADER ||============================== //

const Header = ({ drawerToggle }) => {
  const theme = useTheme();
  const { user } = useUserAuth();

  return (
    <>
      <Box width={drawerWidth}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Grid item>
              <Box mt={0.5}>
                <img src={logo} alt="Logo" width="170px" />
              </Box>
            </Grid>
          </Box>
          <Grid item>
            <IconButton
              edge="start"
              sx={{ mr: theme.spacing(1.25) }}
              color="inherit"
              aria-label="open drawer"
              onClick={drawerToggle}
              size="large"
            >
              <MenuTwoToneIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <ProfileSection />
      <h3>{user?.displayName}</h3> {/* <SearchSection theme="light" /> */}
      {/* <NotificationSection /> */}
    </>
  );
};

Header.propTypes = {
  drawerToggle: PropTypes.func
};

export default Header;
