/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate, Outlet } from 'react-router-dom';
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
  useScrollTrigger,
  Slide,
  Popover,
  Avatar,
} from '@mui/material';
import {
  ShoppingCart,
  Search as SearchIcon,
  Menu as IconMenu,
  StorefrontTwoTone,
  ReceiptOutlined,
  FavoriteBorder,
  SettingsOutlined,
  StarBorder,
  Logout,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { remmoveAuth } from '../../redux/sliceAuth';
import Drawer from './Drawer';

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

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Topbar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.token);
  const count = useSelector(({ cart }) => cart.count);

  const [mobileDraweState, setMobileDrawerState] = React.useState(false);
  const [cartAnchorEl, setCartAnchorEl] = React.useState(null);
  const [userAnchorEl, setUserAnchorEl] = React.useState(null);
  const [tokoAnchorEl, setTokoAnchorEl] = React.useState(null);
  const openCart = Boolean(cartAnchorEl);
  const openUser = Boolean(userAnchorEl);
  const openToko = Boolean(tokoAnchorEl);

  const idCart = openCart ? 'simple-popover' : undefined;
  const idUser = openUser ? 'simple-popover-user' : undefined;
  const idToko = openToko ? 'simple-popover-toko' : undefined;

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

  const handleMobileMenuClose = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileDrawerState(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <HideOnScroll {...props}>
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
                  inputProps={{ 'aria-label': 'search' }}
                />
                <Button variant="contained" aria-label="delete" size="small" sx={{ m: 0.5 }}>
                  <SearchIcon fontSize="medium" />
                </Button>
              </Search>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
                <IconButton onClick={handleClickCart}>
                  <Badge badgeContent={count} color="error">
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
                  <Box sx={{ p: 2 }}>
                    <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                      <Typography fontWeight={600} fontSize={14} color="text.secondary">Keranjang (4)</Typography>
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
                    { [1, 2, 3].map((row) => (
                      <React.Fragment key={row}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <Avatar variant="square" src="https://source.unsplash.com/random" alt="testing" />
                          <Box>
                            <Typography
                              fontSize={14}
                              fontWeight={600}
                              // noWrap
                              // sx={{ maxWidth: 250 }}
                            >
                              Lorem ipsum dolor sit, amet
                            </Typography>
                            <Typography fontSize={12} color="text.secondary">3 Barang</Typography>
                          </Box>
                          <Typography fontSize={14} sx={{ color: 'error.main' }} fontWeight={600}>Rp705.000</Typography>
                        </Box>
                        <Divider sx={{ width: '100%', my: 1 }} />
                      </React.Fragment>
                    ))}
                  </Box>
                </Popover>
                <Divider sx={{ height: 42 }} orientation="vertical" />
                {
                  !token && (
                    <>
                      <Button variant="outlined" size="small" sx={{ textTransform: 'capitalize', fontWeight: 600 }} onClick={() => navigate('login')}>Masuk</Button>
                      <Button variant="contained" size="small" sx={{ textTransform: 'capitalize', fontWeight: 600 }} onClick={() => navigate('register')}>Daftar</Button>
                    </>
                  )
                }
                {
                  token && (
                    <>
                      <Box display="flex" alignItems="center" gap={0.5} mr={1} onClick={handleClickToko} sx={{ cursor: 'pointer' }}>
                        <StorefrontTwoTone sx={({ palette }) => ({ width: 30, height: 30, color: palette.text.secondary })} />
                        <Typography fontSize={14} color="text.secondary" fontWeight={800}>Toko</Typography>
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
                        <Box pt={2} px={4} pb={4} minWidth={250}>
                          <Typography fontSize={14} color="text.secondary" mb={2} textAlign="center">Anda belum memiliki Toko</Typography>
                          <Button variant="contained" fullWidth sx={{ fontSize: 12, fontWeight: 800 }}>Buka Toko Gratis</Button>
                        </Box>
                      </Popover>
                      <Box display="flex" alignItems="center" gap={0.5} onClick={handleClickUser} sx={{ cursor: 'pointer' }}>
                        <Avatar src="https://source.unsplash.com/random" alt="image profile" sx={{ width: 30, height: 30 }} />
                        <Typography fontSize={14} color="text.secondary" fontWeight={800}>Rizki</Typography>
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
                        <Box px={4} py={2} display="flex" flexDirection="column" gap={2} minWidth={200}>
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <Avatar src="https://source.unsplash.com/random" alt="image profile" />
                            <Box>
                              <Typography fontSize={14} fontWeight={800}>Rizki</Typography>
                              <Typography fontSize={14} color="text.secondary">rizki@gmail.com</Typography>
                            </Box>
                          </Box>
                          {[
                            {
                              title: 'Semua Transaksi',
                              icon: <ReceiptOutlined sx={({ palette }) => ({ color: palette.text.secondary })} />,
                              handleClick: () => navigate('/order'),
                            },
                            {
                              title: 'Wishlist',
                              icon: <FavoriteBorder sx={({ palette }) => ({ color: palette.text.secondary })} />,
                              handleClick: () => navigate('/wishlist'),
                            },
                            {
                              title: 'Ulasan',
                              icon: <StarBorder sx={({ palette }) => ({ color: palette.text.secondary })} />,
                              handleClick: () => alert('under development'),
                            },
                            {
                              title: 'Pengaturan',
                              icon: <SettingsOutlined sx={({ palette }) => ({ color: palette.text.secondary })} />,
                              handleClick: () => navigate('/settings'),
                            },
                          ].map(({ title, icon, handleClick }) => (
                            <React.Fragment key="title">
                              <Divider />
                              <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer' }} onClick={handleClick}>
                                {icon}
                                <Typography fontSize={14} color="text.secondary">{title}</Typography>
                              </Box>
                            </React.Fragment>
                          ))}
                          <Divider />
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            my={2}
                            alignSelf="flex-end"
                            onClick={() => {
                              dispatch(remmoveAuth());
                              navigate('login');
                            }}
                            sx={{ cursor: 'pointer' }}
                          >
                            <Logout />
                            <Typography fontSize={14} color="text.secondary">
                              Keluar
                            </Typography>
                          </Box>
                        </Box>
                      </Popover>
                    </>
                  )
                }
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton color="inherit" onClick={handleClickCart}>
                  <Badge badgeContent={count} color="error">
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
        </HideOnScroll>
      </Box>
      <Box sx={{ mt: { xs: 9, sm: 11, md: 12 } }} />
      <Outlet />
    </>
  );
}

export default Topbar;
