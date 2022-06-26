import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useSnackbar } from 'notistack';
import { postRegister } from '../../utils';

function Register() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [registerState, setRegisterState] = React.useState({
    email: '',
    password: '',
    repeatPassword: '',
    loading: false,
  });

  const handleChange = (e) => {
    setRegisterState({ ...registerState, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setRegisterState({ ...registerState, loading: true });
    try {
      if (!registerState.email) {
        throw new Error('email tidak boleh kosong');
      }
      if (!registerState.password) {
        throw new Error('password tidak boleh kosong');
      }
      if (!registerState.password) {
        throw new Error('konfirmasi password tidak boleh kosong');
      }
      if (registerState.password !== registerState.repeatPassword) {
        throw new Error('password dan konfirmasi password tidak sama');
      }
      if (registerState.password.length < 8) {
        throw new Error('password minimal 8 huruf');
      }
      const { email, password } = registerState;
      const user = await postRegister({
        email,
        password,
        role: 'user',
        status: 'aktif',
      });
      setRegisterState({ ...registerState, loading: false });
      if (user.status === 'success') {
        enqueueSnackbar('Registrasi email Berhasil', { variant: 'success' });
        navigate('/login');
      } else {
        enqueueSnackbar(user.message, { variant: 'error' });
      }
    } catch (err) {
      setRegisterState({ ...registerState, loading: false });
      enqueueSnackbar(err.message, { variant: 'error' });
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
          <Typography fontSize={20} fontWeight={600}>Daftar</Typography>
          <Link to="/login">
            <Typography fontSize={13} color="primary.main">Masuk</Typography>
          </Link>
        </Box>
        <TextField onChange={handleChange} name="email" label="Email" variant="outlined" fullWidth sx={{ mt: 5, mb: 2 }} type="email" />
        <TextField onChange={handleChange} name="password" label="Password" variant="outlined" sx={{ mb: 2 }} fullWidth type="password" />
        <TextField onChange={handleChange} name="repeatPassword" label="Konfirmasi Password" variant="outlined" fullWidth type="password" />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleRegister}
          disabled={registerState.loading}
        >
          {registerState.loading ? 'Loading ...' : 'Register'}
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

export default Register;
