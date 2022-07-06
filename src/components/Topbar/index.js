/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Button,
  Divider,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Popover,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ShoppingCart,
  Search as SearchIcon,
  Menu as IconMenu,
  StorefrontTwoTone,
  ShoppingBag,
  Favorite,
  Settings,
  Star,
  Logout,
  Assignment,
  ShoppingBasket,
  DonutSmall,
  Storefront,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { updateIdentity, removeAuthIdentity } from '../../redux/sliceAuth';
import { initCart } from '../../redux/sliceCart';
import Drawer from './Drawer';
import DialogCreateToko from '../DialogCreateToko';
import { getIdentity, getCart, rp } from '../../utils';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    marginLeft: 64,
    marginRight: 32,
  },
  display: 'flex',
  flex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create('width'),
    fontSize: 13,
  },
  flex: 1,
}));

const totalCount = (data) => data.reduce((partialSum, obj) => partialSum + Number(obj.qty), 0);

function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const identity = useSelector(({ auth }) => auth);
  const globalCart = useSelector(({ cart }) => cart);
  const [loadingCart, setLoadingCart] = React.useState(false);
  const [mobileDraweState, setMobileDrawerState] = React.useState(false);
  const [cartAnchorEl, setCartAnchorEl] = React.useState(null);
  const [userAnchorEl, setUserAnchorEl] = React.useState(null);
  const [tokoAnchorEl, setTokoAnchorEl] = React.useState(null);
  const [dialogTokoState, setDialogTokoState] = React.useState(false);
  const [searchState, setSearchState] = React.useState('');
  const openCart = Boolean(cartAnchorEl);
  const openUser = Boolean(userAnchorEl);
  const openToko = Boolean(tokoAnchorEl);

  const idCart = openCart ? 'simple-popover' : undefined;
  const idUser = openUser ? 'simple-popover-user' : undefined;
  const idToko = openToko ? 'simple-popover-toko' : undefined;

  const fetchCart = async () => {
    setLoadingCart(true);
    try {
      const cart = await getCart();
      if (cart.status !== 'success') {
        throw new Error(cart.message);
      }
      dispatch(initCart(cart.data));
      setLoadingCart(false);
    } catch (err) {
      setLoadingCart(false);
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const checkToken = async () => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      const detailUser = await getIdentity();
      if (detailUser.status !== 'success') {
        dispatch(removeAuthIdentity());
        navigate('/');
      }
      dispatch(updateIdentity(detailUser.data));
    }
  };

  const handleClickCart = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCloseCart = () => {
    setCartAnchorEl(null);
  };

  const handleClickUser = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleCloseUser = () => {
    setUserAnchorEl(null);
  };

  const handleClickToko = (event) => {
    setTokoAnchorEl(event.currentTarget);
  };

  const handleCloseToko = () => {
    setTokoAnchorEl(null);
  };

  const handleMobileMenuOpen = () => {
    setMobileDrawerState(true);
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

  const handleMobileMenuClose = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileDrawerState(false);
  };

  React.useEffect(() => {
    checkToken();
    if (identity.user) {
      fetchCart();
    }
  }, []);

  if (!identity.user && identity.token) {
    return (
      <Box display="flex" justifyContent="center" py={5}>
        <Typography>Loading ...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {/* <HideOnScroll {...props}> */}
        <AppBar color="default" sx={{ boxShadow: 'rgb(0 0 0 / 7%) 0px 4px 6px -1px', bgcolor: '#fff' }}>
          <Toolbar>
            <Typography
              variant="h6"
              color="primary"
              noWrap
              component="div"
              sx={{
                display: { xs: 'none', sm: 'block' }, mr: 2, fontWeight: 600, cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              MUI-Commerce
            </Typography>
            <Box mr={2} onClick={() => navigate('/')} sx={{ display: { xs: 'block', sm: 'none' } }}>
              <Typography fontSize={14} fontWeight={800} color="primary">MUI-C</Typography>
            </Box>
            <Search>
              <StyledInputBase
                placeholder="Search…"
                value={searchState}
                onChange={(e) => setSearchState(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (searchState) {
                      navigate(`/search/${searchState}`);
                    }
                  }
                }}
              />
              <Button
                variant="contained"
                aria-label="delete"
                size="small"
                sx={{ m: 0.5 }}
                onClick={() => {
                  if (searchState) {
                    navigate(`/search/${searchState}`);
                  }
                }}
              >
                <SearchIcon fontSize="medium" />
              </Button>
            </Search>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              <IconButton onClick={handleClickCart}>
                <Badge badgeContent={totalCount(globalCart.data)} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <Popover
                id={idCart}
                open={openCart}
                anchorEl={cartAnchorEl}
                onClose={handleCloseCart}
                anchorOrigin={{
                  vertical: 53,
                  horizontal: 'left',
                }}
              >
                { !identity.user && (
                  <Box px={4} py={2}>
                    <Typography fontSize={14} color="text.secondary" textAlign="center">Anda belum masuk</Typography>
                    <Typography fontSize={14} color="text.secondary" textAlign="center">Silahkan masuk terlebih dahulu</Typography>
                    <Button fullWidth variant="outlined" size="small" sx={{ textTransform: 'capitalize', fontWeight: 600, mt: 2 }} onClick={() => navigate('login')}>Masuk</Button>
                  </Box>
                )}
                {(identity.user && loadingCart) && (
                  <Box px={6} py={4}>
                    <Typography color="text.secondary" fontSize={14}>Loading ...</Typography>
                  </Box>
                )}
                {(identity.user && globalCart.data.length !== 0 && !loadingCart) && (
                  <Box sx={{ p: 2 }}>
                    <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" gap={4}>
                      <Typography fontWeight={600} fontSize={14} color="text.secondary">
                        Keranjang (
                        {totalCount(globalCart.data)}
                        )
                      </Typography>
                      <Typography
                        fontWeight={600}
                        fontSize={14}
                        color="primary.main"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleCloseCart();
                          navigate('cart');
                        }}
                      >
                        Lihat Semua
                      </Typography>
                    </Box>
                    { globalCart.data.map((row) => (
                      <React.Fragment key={row.id_item}>
                        <Box sx={{
                          display: 'flex', gap: { xs: 2, sm: 4 }, alignItems: 'center', justifyContent: 'space-between',
                        }}
                        >
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Avatar variant="square" src={row.foto} alt={row.name} />
                            <Box>
                              <Typography
                                fontSize={14}
                                fontWeight={600}
                              >
                                {row.name}
                              </Typography>
                              <Typography fontSize={12} color="text.secondary">
                                {row.qty}
                                {' '}
                                Barang
                              </Typography>
                            </Box>
                          </Box>
                          <Typography fontSize={14} sx={{ color: 'error.main' }} fontWeight={600}>{rp(row.price)}</Typography>
                        </Box>
                        <Divider sx={{ width: '100%', my: 1 }} />
                      </React.Fragment>
                    ))}
                  </Box>
                )}
                {(identity.user && globalCart.data.length === 0 && !loadingCart) && (
                  <Box px={4} py={2}>
                    <Typography fontSize={14} color="text.secondary" textAlign="center">Keranjangmu Kosong</Typography>
                  </Box>
                )}
              </Popover>
              <Divider sx={{ height: 42 }} orientation="vertical" />
              {
                !identity.token && (
                  <>
                    <Button variant="outlined" size="small" sx={{ textTransform: 'capitalize', fontWeight: 600 }} onClick={() => navigate('login')}>Masuk</Button>
                    <Button variant="contained" size="small" sx={{ textTransform: 'capitalize', fontWeight: 600 }} onClick={() => navigate('register')}>Daftar</Button>
                  </>
                )
              }
              {
                identity.token && (
                  <>
                    <Box display="flex" alignItems="center" gap={0.5} mr={1} onClick={handleClickToko} sx={{ cursor: 'pointer' }}>
                      <StorefrontTwoTone sx={({ palette }) => ({ width: 30, height: 30, color: palette.text.secondary })} />
                      <Typography fontSize={14} color="text.secondary" fontWeight={800}>Toko Saya</Typography>
                    </Box>
                    <Popover
                      id={idToko}
                      open={openToko}
                      anchorEl={tokoAnchorEl}
                      onClose={handleCloseToko}
                      anchorOrigin={{
                        vertical: 40,
                        horizontal: 'left',
                      }}
                    >
                      {
                        !identity.toko && (
                          <Box pt={2} px={4} pb={4} minWidth={250}>
                            <Typography fontSize={14} color="text.secondary" mb={2} textAlign="center">Anda belum memiliki Toko</Typography>
                            <Button variant="contained" fullWidth sx={{ fontSize: 12, fontWeight: 800 }} onClick={() => handleOpenDialogToko('add')}>Buka Toko Gratis</Button>
                          </Box>
                        )
                      }
                      {
                        identity.toko && (
                          <Box pt={2} display="flex" flexDirection="column" minWidth={250}>
                            <Box display="flex" alignItems="center" gap={1.5} mx={4}>
                              <Avatar src={identity.toko.foto} variant="square" sx={{ borderRadius: 1 }} />
                              <Box>
                                <Typography fontSize={14} fontWeight={800}>{identity.toko.name}</Typography>
                                <Box display="flex" gap={0.5}>
                                  <Typography fontSize={14} sx={{ color: 'text.secondary' }}>Saldo : </Typography>
                                  <Typography fontSize={14} sx={{ color: 'success.main' }} fontWeight={800}>{rp(identity.toko.saldo || 0)}</Typography>
                                </Box>
                              </Box>
                            </Box>
                            <List disablePadding sx={{ mt: 2 }}>
                              {
                                [
                                  {
                                    title: 'Profil Toko',
                                    icon: <Storefront />,
                                    handleClick: () => {
                                      handleCloseToko();
                                      handleOpenDialogToko('edit');
                                    },
                                  },
                                  {
                                    title: 'Pesanan',
                                    icon: <Assignment />,
                                    handleClick: () => {
                                      handleCloseToko();
                                      navigate('/order');
                                    },
                                  },
                                  {
                                    title: 'Produk',
                                    icon: <ShoppingBasket />,
                                    handleClick: () => {
                                      handleCloseToko();
                                      navigate('/products');
                                    },
                                  },
                                  {
                                    title: 'Statistik',
                                    icon: <DonutSmall />,
                                    handleClick: () => {
                                      handleCloseToko();
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
                            <Box display="flex" justifyContent="space-between" px={2} py={4} gap={6}>
                              <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                onClick={() => {
                                  dispatch(removeAuthIdentity());
                                  navigate('login');
                                }}
                                sx={{ cursor: 'pointer' }}
                              >
                                <Logout color="disabled" />
                                <Typography fontSize={14} color="text.secondary">
                                  Keluar
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        )
                      }
                    </Popover>
                    <DialogCreateToko
                      open={dialogTokoState.open}
                      action={dialogTokoState.action}
                      onClose={handleCloseDialogToko}
                      data={identity.toko}
                    />
                    <Box display="flex" alignItems="center" gap={1} onClick={handleClickUser} sx={{ cursor: 'pointer' }}>
                      <Avatar src={identity.user.foto} sx={{ width: 30, height: 30 }} />
                      <Typography fontSize={14} color="text.secondary" fontWeight={800}>{identity.user.name}</Typography>
                    </Box>
                    <Popover
                      id={idUser}
                      open={openUser}
                      anchorEl={userAnchorEl}
                      onClose={handleCloseUser}
                      anchorOrigin={{
                        vertical: 40,
                        horizontal: 'left',
                      }}
                    >
                      <Box pt={2} display="flex" flexDirection="column" minWidth={200}>
                        <Box display="flex" alignItems="center" gap={1.5} mx={4} mb={1}>
                          <Avatar src={identity.user.foto} />
                          <Box>
                            <Typography fontSize={14} fontWeight={800}>{identity.user.name}</Typography>
                            <Typography fontSize={14} color="text.secondary">{identity.user.email}</Typography>
                          </Box>
                        </Box>
                        <List>
                          {[
                            {
                              title: 'Pembelian',
                              icon: <ShoppingBag />,
                              handleClick: () => navigate('/purchase'),
                            },
                            {
                              title: 'Wishlist',
                              icon: <Favorite />,
                              handleClick: () => navigate('/wishlist'),
                            },
                            {
                              title: 'Ulasan',
                              icon: <Star />,
                              handleClick: () => navigate('/reviews'),
                            },
                            {
                              title: 'Pengaturan',
                              icon: <Settings />,
                              handleClick: () => navigate('/settings'),
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
                          ))}
                        </List>
                        <Divider />
                        <Box display="flex" justifyContent="space-between" px={2} py={4} gap={6}>
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            onClick={() => {
                              dispatch(removeAuthIdentity());
                              navigate('login');
                            }}
                            sx={{ cursor: 'pointer' }}
                          >
                            <Logout color="disabled" />
                            <Typography fontSize={14} color="text.secondary">
                              Keluar
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Popover>
                  </>
                )
              }
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton color="inherit" onClick={handleClickCart}>
                <Badge badgeContent={totalCount(globalCart.data)} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show more"
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <IconMenu />
              </IconButton>
              <Drawer
                open={mobileDraweState}
                onClose={handleMobileMenuClose}
              />
            </Box>
          </Toolbar>
        </AppBar>
        {/* </HideOnScroll> */}
      </Box>
      <Box sx={{ mt: { xs: 9, sm: 11, md: 12 } }} />
      <Outlet />
    </>
  );
}

export default Topbar;
