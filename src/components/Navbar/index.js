import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { ListItemIcon, Avatar, Grid } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../../assets/images/logo.png';

import classes from './Navbar.module.css';
import { isLoggedIn, logout } from '../../utils/auth';

const drawerWidth = 240;
const navItems = [
  { name: 'Home', route: '/', icon: <HomeOutlinedIcon />, requiredAuth: false },
  {
    name: 'Call for Paper',
    route: '/cfp',
    icon: <CampaignIcon />,
    requiredAuth: true,
  },
  {
    name: 'AllConferences',
    route: '/allconferences',
    icon: <MenuBookOutlinedIcon />,
    requiredAuth: false,
  },
  {
    name: 'Profile',
    route: '/userprofile',
    icon: <AccountCircleOutlinedIcon />,
    requiredAuth: true,
  },
  {
    name: 'Logout',
    route: '/login',
    icon: <LogoutIcon />,
    method: logout,
    requiredAuth: true,
  },
  {
    name: 'Login',
    route: '/login',
    icon: <LoginIcon />,
    requiredAuth: false,
    removeOnLogin: true,
  },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const loggedIn = isLoggedIn();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant='h6'
        sx={{ my: 2 }}
        onClick={() => {
          navigate('/');
        }}
      >
        CONFERENCIFY
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => {
          if (item.requiredAuth === true && loggedIn === false) return;
          if (
            item.removeOnLogin &&
            item.removeOnLogin === true &&
            loggedIn === true
          )
            return;
          return (
            <ListItem
              key={item.name}
              onClick={item.method ? item.method : () => {}}
              disablePadding
            >
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={() => navigate(item.route)}
              >
                {item.icon}
                <ListItemText
                  primary={item.name}
                  style={{ color: '#fff important' }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <AppBar component='nav' className={classes.header}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: '#fff !important' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{
              flexGrow: 1,
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            <img src={logo} className={classes.logo} alt='Logo' />
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => {
              if (item.requiredAuth === true && loggedIn === false) return;
              if (
                item.removeOnLogin &&
                item.removeOnLogin === true &&
                loggedIn === true
              )
                return;
              return (
                <Button
                  key={item.name}
                  sx={{ color: '#fff !important' }}
                  onClick={() => navigate(item.route)}
                >
                  <p
                    style={{ marginRight: '4px', marginTop: '4px' }}
                    onClick={item.method ? item.method : () => {}}
                  >
                    {' '}
                    {item.icon}
                  </p>
                  <p onClick={item.method ? item.method : () => {}}>
                    {item.name}
                  </p>
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          className={classes.header}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
