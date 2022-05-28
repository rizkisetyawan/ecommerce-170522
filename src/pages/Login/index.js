import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

function Login() {
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
          <Typography fontSize={13} color="primary.main">Daftar</Typography>
        </Box>
        <TextField label="Email" variant="outlined" fullWidth sx={{ mt: 5, mb: 2 }} />
        <TextField label="Password" variant="outlined" fullWidth />
        <Typography fontSize={13} color="primary.main" textAlign="right" my={1}>Lupa kata sandi?</Typography>
        <Button variant="contained" fullWidth>Login</Button>
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
