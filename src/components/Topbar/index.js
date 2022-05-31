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
  MenuItem,
  Menu,
  useScrollTrigger,
  Slide,
  Popover,
} from '@mui/material';
import {
  ShoppingCart,
  Search as SearchIcon,
  AccountCircle,
  Mail,
  Notifications,
  MoreVert,
} from '@mui/icons-material';

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [cartAnchorEl, setCartAnchorEl] = React.useState(null);

  const openCart = Boolean(cartAnchorEl);
  const idCart = openCart ? 'simple-popover' : undefined;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleClickCart = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCloseCart = () => {
    setCartAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

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
              <Search>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
                <Button variant="contained" aria-label="delete" size="small" sx={{ m: 0.5 }}>
                  <SearchIcon fontSize="medium" />
                </Button>
              </Search>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.5 }}>
                <IconButton aria-label="delete" onClick={handleClickCart}>
                  <Badge badgeContent={100} color="error">
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
                          <img src="https://source.unsplash.com/random" alt="testing" height={50} width={50} style={{ objectFit: 'cover' }} />
                          <Box>
                            <Typography
                              fontSize={14}
                              fontWeight={600}
                              noWrap
                              sx={{ maxWidth: 250 }}
                            >
                              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                              Nostrum doloremque nesciunt consequatur repellendus eveniet
                              minima nulla cumque tempore,nihil tempora? Quidem facilis
                              dolorem porro tempore perferendis sed reiciendis quasi
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
                <Button variant="outlined" size="small" sx={{ textTransform: 'capitalize', fontWeight: 600 }} onClick={() => navigate('login')}>Masuk</Button>
                <Button variant="contained" size="small" sx={{ textTransform: 'capitalize', fontWeight: 600 }} onClick={() => navigate('register')}>Daftar</Button>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreVert />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      <Box sx={{ mt: { xs: 9, sm: 11, md: 15 } }} />
      <Outlet />
    </>
  );
}

export default Topbar;
