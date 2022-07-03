import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { updateAuth } from '../../redux/sliceAuth';
import { postLogin } from '../../utils';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loginState, setLoginState] = React.useState({
    email: '',
    password: '',
    loading: false,
  });

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoginState({ ...loginState, loading: true });
    try {
      if (!loginState.email) {
        throw new Error('email tidak boleh kosong');
      }
      if (!loginState.password) {
        throw new Error('password tidak boleh kosong');
      }
      const { email, password } = loginState;
      const user = await postLogin({ email, password });
      setLoginState({ ...loginState, loading: false });
      if (user.status === 'success') {
        enqueueSnackbar('Login Berhasil', { variant: 'success' });
        dispatch(updateAuth(user.data.token));
        if (user.data.role === 'user') { navigate('/'); }
        if (user.data.role === 'admin') { navigate('/admin'); }
      } else {
        enqueueSnackbar(user.message, { variant: 'error' });
      }
    } catch (err) {
      setLoginState({ ...loginState, loading: false });
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography mt={5} mb={4} color="primary.main" fontSize={24} fontWeight={600}>MUI-Commerce</Typography>
      <Box
        sx={{
          boxShadow: {
            sx: 'none',
            sm: '0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))',
          },
          width: 300,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Box mt={3} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontSize={20} fontWeight={600}>Masuk</Typography>
          <Link to="/register">
            <Typography fontSize={13} color="primary.main">Daftar</Typography>
          </Link>
        </Box>
        <TextField
          onChange={handleChange}
          label="Email"
          variant="outlined"
          name="email"
          fullWidth
          sx={{ mt: 5, mb: 2 }}
          type="email"
          onKeyDown={handlePressEnter}
        />
        <TextField
          onChange={handleChange}
          label="Password"
          variant="outlined"
          name="password"
          fullWidth
          type="password"
          onKeyDown={handlePressEnter}
        />
        {/* <Typography fontSize={13} color="primary.main"
        textAlign="right" my={1}>Lupa kata sandi?</Typography> */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          onKeyDown={handlePressEnter}
          disabled={loginState.loading}
          sx={{ mt: 4 }}
        >
          {loginState.loading ? 'Loading ...' : 'Login'}
        </Button>
        <Typography fontSize={13} textAlign="center" my={1}>
          Butuh bantuan? Hubungi
          {' '}
          <Typography fontSize={13} color="primary.main" display="inline">Admin</Typography>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
