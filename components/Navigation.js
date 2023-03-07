import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
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
  ListItemButton, Tooltip, Menu, MenuItem, Typography, Button, Collapse, ListItemText, Badge,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ProductTypeContext } from '../utils/context/productTypeContext';
import { CartCountContext } from '../utils/context/cartCountContext';
import { signOut, signIn } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import theme from '../styles/theme';

const drawerWidth = 340;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
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

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Navigation({ onDrawerOpen, onDrawerClose }) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [expandedProductTypes, setExpandedProductTypes] = useState([]);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {
    productType, setProductType, careLevel, setCareLevel, lightLevel, setLightLevel, waterNeeds, setWaterNeeds, petFriendly, setPetFriendly, designStyle, setDesignStyle, designRoom, setDesignRoom,
  } = useContext(ProductTypeContext);
  const { cartCount } = useContext(CartCountContext);
  const [lightLevelOpen, setLightLevelOpen] = useState(false);
  const [careLevelOpen, setCareLevelOpen] = useState(false);
  const [waterNeedsOpen, setWaterNeedsOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const [styleOpen, setStyleOpen] = useState(false);

  const handleToggle = (state, setState) => () => {
    setState(!state);
  };

  const handleProductTypeClick = (type) => {
    setProductType(type);
    setExpandedProductTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleCareLevelClick = handleToggle(careLevelOpen, setCareLevelOpen);
  const handleWaterNeedsClick = handleToggle(waterNeedsOpen, setWaterNeedsOpen);
  const handleLightLevelClick = handleToggle(lightLevelOpen, setLightLevelOpen);

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
  // Handlers for radio group value changes
  const handleCareLevelChange = (event) => {
    setCareLevel(event.target.value);
  };

  const handleLightLevelChange = (event) => {
    setLightLevel(event.target.value);
  };
  const handleWaterNeedsChange = (event) => {
    setWaterNeeds(event.target.value);
  };

  const handlePetFriendlyChange = (event) => {
    setPetFriendly(event.target.value);
  };

  const handleDesignRoomChange = (event) => {
    setDesignRoom(event.target.value);
  };

  const handleDesignStyleChange = (event) => {
    setDesignStyle(event.target.value);
  };

  const handleClearFilters = () => {
    setCareLevel('');
    setLightLevel('');
    setWaterNeeds('');
    setPetFriendly('');
    setDesignRoom('');
    setDesignStyle('');
  };

  return (
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
              <Badge badgeContent={cartCount} color="warning">
                <ShoppingCartIcon />
              </Badge>
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
          <ListItemButton
            onClick={() => {
              handleProductTypeClick('Houseplants');
              router.push('/products');
            }}
          >
            Houseplants
            {expandedProductTypes.Houseplants ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {productType === 'Houseplants' && expandedProductTypes.Houseplants ? (
            <Collapse in={expandedProductTypes.Houseplants} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItemButton onClick={handleCareLevelClick}>
                  <ListItemText primary="Care Level" />
                  {careLevelOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={careLevelOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton>
                      <RadioGroup sx={{ pl: 4 }} value={careLevel} onChange={handleCareLevelChange}>
                        <FormControlLabel value="novice" control={<Radio />} label="Novice" />
                        <FormControlLabel value="intermediate" control={<Radio />} label="Intermediate" />
                        <FormControlLabel value="expert" control={<Radio />} label="Expert" />
                      </RadioGroup>
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleLightLevelClick}>
                  <ListItemText primary="Light Level" />
                  {lightLevelOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={lightLevelOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton>
                      <RadioGroup sx={{ pl: 4 }} value={lightLevel} onChange={handleLightLevelChange}>
                        <FormControlLabel value="low" control={<Radio />} label="Low" />
                        <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                        <FormControlLabel value="high" control={<Radio />} label="High" />
                      </RadioGroup>
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleWaterNeedsClick}>
                  <ListItemText primary="Water Needs" />
                  {waterNeedsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={waterNeedsOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 4 }}>
                    <ListItemButton>
                      <RadioGroup value={waterNeeds} onChange={handleWaterNeedsChange}>
                        <FormControlLabel value="low" control={<Radio />} label="Low" />
                        <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                        <FormControlLabel value="high" control={<Radio />} label="High" />
                      </RadioGroup>
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton>
                  Pet Friendly
                  <RadioGroup value={petFriendly} sx={{ pl: 1 }}>
                    <FormControlLabel onClick={handlePetFriendlyChange} value="True" control={<Radio />} />
                  </RadioGroup>
                </ListItemButton>
                {careLevel || waterNeeds || lightLevel || petFriendly ? <Button onClick={handleClearFilters}>Clear Filters</Button> : ''}
              </List>
            </Collapse>
          ) : null}
          <ListItemButton
            onClick={() => {
              handleProductTypeClick('Designs');
              router.push('/designs');
            }}
          >
            Designs/Looks
            {expandedProductTypes.Designs ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {productType === 'Designs' && expandedProductTypes.Designs ? (
            <Collapse sx={{ pl: 4 }} in={expandedProductTypes.Designs} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={handleToggle(roomOpen, setRoomOpen)}>
                  <ListItemText primary="Room" />
                  {roomOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={roomOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton>
                      <RadioGroup sx={{ pl: 4 }} value={designRoom} onChange={handleDesignRoomChange}>
                        <FormControlLabel value="living_room" control={<Radio />} label="Living Room" />
                        <FormControlLabel value="bedroom" control={<Radio />} label="Bedroom" />
                        <FormControlLabel value="office" control={<Radio />} label="Office" />
                        <FormControlLabel value="bathroom" control={<Radio />} label="Bathroom" />
                      </RadioGroup>
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton sx={{ pl: 4 }} onClick={handleToggle(styleOpen, setStyleOpen)}>
                  <ListItemText primary="Style" />
                  {styleOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={styleOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton>
                      <RadioGroup sx={{ pl: 4 }} value={designStyle} onChange={handleDesignStyleChange}>
                        <FormControlLabel value="midcentury_modern" control={<Radio />} label="Midcentury Modern" />
                        <FormControlLabel value="modern" control={<Radio />} label="Modern" />
                        <FormControlLabel value="bohemian" control={<Radio />} label="Bohemian" />
                        <FormControlLabel value="industrial" control={<Radio />} label="Industrial" />
                        <FormControlLabel value="traditional" control={<Radio />} label="Traditional" />
                      </RadioGroup>
                    </ListItemButton>
                  </List>
                </Collapse>
                {designRoom || designStyle ? (
                  <Button sx={{ pl: 4 }} onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                ) : (
                  ''
                )}
              </List>
            </Collapse>
          ) : null}
          <ListItemButton onClick={() => router.push('/products').then(handleProductTypeClick('Home/Decor'))}>Home & Decor</ListItemButton>
          <ListItemButton onClick={() => router.push('/products').then(handleProductTypeClick('Plant Care'))}>Plant Care</ListItemButton>
          <ListItemButton onClick={() => router.push('/products').then(handleProductTypeClick('Planters/Stands'))}>Planters & Stands</ListItemButton>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}

Navigation.propTypes = {
  onDrawerOpen: PropTypes.func.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
};
