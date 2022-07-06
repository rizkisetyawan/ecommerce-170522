/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Avatar,
  Box,
  Button,
  Drawer as MUIdrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
  StorefrontTwoTone,
  Favorite,
  Settings,
  Logout,
  Assignment,
  ShoppingBasket,
  DonutSmall,
  Star,
  ShoppingBag,
  Storefront,
} from '@mui/icons-material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAuthIdentity } from '../../redux/sliceAuth';
import DialogCreateToko from '../DialogCreateToko';

function TabHeadToko() {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <StorefrontTwoTone />
      <Typography maxWidth={100} fontSize={12} fontWeight={800} display="block" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
        Toko Saya
      </Typography>
    </Box>
  );
}

function TabHeadUser({ user }) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Avatar src={user.foto} alt={user.name || user.email} sx={{ width: 30, height: 30 }} />
      <Typography maxWidth={100} fontSize={12} fontWeight={800} display="block" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
        {user.name || user.email}
      </Typography>
    </Box>
  );
}

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const identity = useSelector(({ auth }) => auth);
  const [value, setValue] = React.useState(0);
  const [dialogTokoState, setDialogTokoState] = React.useState({
    open: false,
    action: 'add',
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenDialogToko = (action) => {
    setDialogTokoState({
      open: true,
      action,
    });
  };

  const handleCloseDialogToko = () => {
    setDialogTokoState({
      open: false,
      action: 'add',
    });
  };

  const handleLogout = () => {
    dispatch(removeAuthIdentity());
    navigate('login');
  };

  return (
    <Box sx={{ width: '100%' }}>
      { !identity.token && (
        <Box px={2}>
          <Typography fontSize={14} color="text.secondary" textAlign="center">Anda belum Masuk</Typography>
          <Typography fontSize={14} color="text.secondary" textAlign="center">Silahkan masuk terlebih dahulu</Typography>
          <Button fullWidth variant="outlined" size="small" sx={{ textTransform: 'capitalize', fontWeight: 600, mt: 2 }} onClick={() => navigate('login')}>Masuk</Button>
        </Box>
      )}
      { identity.token && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={<TabHeadUser user={identity.user} />} {...a11yProps(0)} />
              <Tab label={<TabHeadToko />} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="calc(100vh - 86px)"
            >
              <Box>
                <Box display="flex" alignItems="center" gap={1.5} mx={4} mt={2} mb={1}>
                  <Avatar src={identity.user.foto} />
                  <Box>
                    <Typography fontSize={14} fontWeight={800}>{identity.user.name}</Typography>
                    <Typography fontSize={14} color="text.secondary">{identity.user.email}</Typography>
                  </Box>
                </Box>
                <List>
                  {
                    [
                      {
                        title: 'Pembelian',
                        icon: <ShoppingBag />,
                        handleClick: (e) => {
                          onClose(e);
                          navigate('/purchase');
                        },
                      },
                      {
                        title: 'Wishlist',
                        icon: <Favorite />,
                        handleClick: (e) => {
                          onClose(e);
                          navigate('/wishlist');
                        },
                      },
                      {
                        title: 'Ulasan',
                        icon: <Star />,
                        handleClick: (e) => {
                          onClose(e);
                          navigate('/reviews');
                        },
                      },
                      {
                        title: 'Pengaturan',
                        icon: <Settings />,
                        handleClick: (e) => {
                          onClose(e);
                          navigate('/settings');
                        },
                      },
                    ].map((row, i) => (
                      <ListItem
                        key={row.title}
                        disablePadding
                        sx={{
                          borderBottom: i === 4 ? 1 : 0,
                          borderTop: 1,
                          borderColor: 'divider',
                        }}
                      >
                        <ListItemButton onClick={row.handleClick}>
                          <ListItemIcon>
                            {row.icon}
                          </ListItemIcon>
                          <ListItemText sx={{ '& span': { fontSize: 14 } }} primary={row.title} />
                        </ListItemButton>
                      </ListItem>
                    ))
                  }
                </List>
              </Box>
              <List sx={{ mt: 2 }}>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText sx={{ '& span': { fontSize: 14 } }} primary="Keluar" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="calc(100vh - 86px)"
            >
              { !identity.toko && (
                <Box m={2} mt="30%">
                  <Typography fontSize={14} color="text.secondary" mb={2} textAlign="center">Anda belum memiliki Toko</Typography>
                  <Button variant="contained" fullWidth sx={{ fontSize: 12, fontWeight: 800 }} onClick={() => handleOpenDialogToko('add')}>Buka Toko Gratis</Button>
                </Box>
              )}
              { identity.toko && (
                <Box pt={2}>
                  <Box display="flex" alignItems="center" gap={1.5} mx={4}>
                    <Avatar src={identity.toko.foto} variant="square" sx={{ borderRadius: 1 }} />
                    <Box>
                      <Typography fontSize={14} fontWeight={800}>{identity.toko.name}</Typography>
                    </Box>
                  </Box>
                  <List sx={{ mt: 1 }}>
                    {
                      [
                        {
                          title: 'Profil Toko',
                          icon: <Storefront />,
                          handleClick: () => {
                            handleOpenDialogToko('edit');
                          },
                        },
                        {
                          title: 'Pesanan',
                          icon: <Assignment />,
                          handleClick: (e) => {
                            onClose(e);
                            navigate('/order');
                          },
                        },
                        {
                          title: 'Produk',
                          icon: <ShoppingBasket />,
                          handleClick: (e) => {
                            onClose(e);
                            navigate('/products');
                          },
                        },
                        {
                          title: 'Statistik',
                          icon: <DonutSmall />,
                          handleClick: (e) => {
                            onClose(e);
                            navigate('/statistics');
                          },
                        },
                      ].map((row, i) => (
                        <ListItem
                          key={row.title}
                          disablePadding
                          sx={{
                            borderBottom: i === 2 ? 1 : 0,
                            borderTop: 1,
                            borderColor: 'divider',
                          }}
                        >
                          <ListItemButton onClick={row.handleClick}>
                            <ListItemIcon>
                              {row.icon}
                            </ListItemIcon>
                            <ListItemText sx={{ '& span': { fontSize: 14 } }} primary={row.title} />
                          </ListItemButton>
                        </ListItem>
                      ))
                    }
                  </List>
                </Box>
              )}
              <DialogCreateToko
                open={dialogTokoState.open}
                onClose={handleCloseDialogToko}
                action={dialogTokoState.action}
                data={identity.toko}
              />
              <List sx={{ mt: 2 }}>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText sx={{ '& span': { fontSize: 14 } }} primary="Keluar" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </TabPanel>
        </>
      )}
    </Box>
  );
}

function Drawer({ open, onClose }) {
  return (
    <MUIdrawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box minWidth={250} pt={2} px={1}>
        <BasicTabs onClose={onClose} />
      </Box>
    </MUIdrawer>
  );
}

export default Drawer;
