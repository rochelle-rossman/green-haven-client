import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {
  styled, createTheme, ThemeProvider,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  ListItemButton, Tooltip, Menu, MenuItem, Typography, Button, Collapse, ListItem,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ProductTypeContext } from '../utils/context/productTypeContext';
import { signOut, signIn } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

const drawerWidth = 340;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#9ccc65',
    },
    secondary: {
      main: '#43a047',
    },
  },
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            fontSize: '0.8rem',
          },
        },
      },
    },
    formControlLabel: {
      fontSize: '0.5rem',
      '& .MuiTypography-root': {
        fontSize: '0.5rem',
      },
    },
  },
  typography: {
    fontFamily: 'Roboto Slab, serif',
  },
});

export default function Navigation({ onDrawerOpen, onDrawerClose }) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { productType, setProductType } = useContext(ProductTypeContext);

  const handleProductTypeClick = (type) => {
    if (type === productType) {
      setOpenCollapse(!openCollapse);
    } else {
      setProductType(type);
      setOpenCollapse(true);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    onDrawerOpen();
  };

  const handleDrawerClose = () => {
    setOpen(false);
    onDrawerClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" color="primary" open={open}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <Button onClick={() => router.push('/')}>
              <Image src="/images/green-haven-high-resolution-logo-color-on-transparent-background.png" alt="Green Haven Logo" width={200} height={50} />
            </Button>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1, marginLeft: 'auto' }}>
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user.id ? (
                <div>
                  <MenuItem>
                    <Typography>
                      <Link href={`/user/${user.id}`}>My Account</Link>
                    </Typography>
                  </MenuItem>
                </div>
              ) : (
                ''
              )}
              <MenuItem onClick={handleCloseUserMenu}>
                {user ? (
                  <Typography onClick={signOut} textAlign="center">
                    Logout
                  </Typography>
                ) : (
                  <Typography textAlign="center" onClick={signIn}>
                    Login/Register
                  </Typography>
                )}
              </MenuItem>
            </Menu>
            {user.id ? (
              <IconButton aria-label="cart" onClick={() => router.push(`/user/shoppingCart/${user.id}`)}>
                <ShoppingCartIcon />
              </IconButton>
            ) : (
              ''
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItemButton onClick={() => router.push('/products').then(handleProductTypeClick(''))}>Shop All Products</ListItemButton>
            <ListItemButton onClick={() => router.push('/products').then(handleProductTypeClick('Houseplants'))}>
              Houseplants
              {openCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {productType === 'Houseplants' && openCollapse ? (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" sx={{ pl: 4 }} disablePadding>
                  <ListItem>
                    <RadioGroup>
                      <ListItem>Care Level</ListItem>
                      <FormControlLabel sx={{ pl: 4 }} value="novice" control={<Radio />} label="Novice" />
                      <FormControlLabel sx={{ pl: 4 }} value="intermediate" control={<Radio />} label="Intermediate" />
                      <FormControlLabel sx={{ pl: 4 }} value="expert" control={<Radio />} label="Expert" />
                    </RadioGroup>
                  </ListItem>
                  <ListItem>
                    <RadioGroup>
                      <ListItem>Light Level</ListItem>
                      <FormControlLabel sx={{ pl: 4 }} value="low" control={<Radio />} label="Low" />
                      <FormControlLabel sx={{ pl: 4 }} value="medium" control={<Radio />} label="Medium" />
                      <FormControlLabel sx={{ pl: 4 }} value="high" control={<Radio />} label="High" />
                    </RadioGroup>
                  </ListItem>
                  <ListItem>
                    <RadioGroup>
                      <ListItem>Water Needs</ListItem>
                      <FormControlLabel sx={{ pl: 4 }} value="low" control={<Radio />} label="Low" />
                      <FormControlLabel sx={{ pl: 4 }} value="medium" control={<Radio />} label="Medium" />
                      <FormControlLabel sx={{ pl: 4 }} value="high" control={<Radio />} label="High" />
                    </RadioGroup>
                  </ListItem>
                </List>
              </Collapse>
            ) : null}
            <ListItemButton onClick={() => router.push('/designs').then(setProductType(''))}>Designs/Looks</ListItemButton>
            <ListItemButton onClick={() => router.push('/products').then(handleProductTypeClick('Home/Decor'))}>Home & Decor</ListItemButton>
            <ListItemButton onClick={() => router.push('/products').then(handleProductTypeClick('Plant Care'))}>Plant Care</ListItemButton>
            <ListItemButton onClick={() => router.push('/products').then(handleProductTypeClick('Planters/Stands'))}>Planters & Stands</ListItemButton>
          </List>
          <Divider />
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

Navigation.propTypes = {
  onDrawerOpen: PropTypes.func.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
};
