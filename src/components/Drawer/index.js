/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
} from '@mui/material';
import {
  Group, Dashboard, Receipt, ShoppingBag, Menu,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getIdentity } from '../../utils';
import { updateIdentity, removeAuthIdentity } from '../../redux/sliceAuth';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const checkToken = async () => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      try {
        const detailUser = await getIdentity();
        if (detailUser.status !== 'success') {
          throw new Error(detailUser.message);
        }
        dispatch(updateIdentity(detailUser.data));
      } catch (err) {
        dispatch(removeAuthIdentity());
        navigate('/login');
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          {
            title: 'Dasboard',
            icon: <Dashboard />,
            handleClick: () => navigate('/admin'),
          },
          {
            title: 'User',
            icon: <Group />,
            handleClick: () => navigate('/admin/users'),
          },
          {
            title: 'Produk',
            icon: <ShoppingBag />,
            handleClick: () => navigate('/admin/products'),
          },
          {
            title: 'Transaksi',
            icon: <Receipt />,
            handleClick: () => navigate('/admin/transactions'),
          },
        ].map((row) => (
          <ListItem key={row.title} disablePadding>
            <ListItemButton onClick={row.handleClick}>
              <ListItemIcon>
                {row.icon}
              </ListItemIcon>
              <ListItemText primary={row.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
