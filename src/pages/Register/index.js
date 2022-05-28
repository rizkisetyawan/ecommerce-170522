import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

function Register() {
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
          <Typography fontSize={13} color="primary.main">Masuk</Typography>
        </Box>
        <TextField label="Email" variant="outlined" fullWidth sx={{ mt: 5, mb: 2 }} />
        <TextField label="Password" variant="outlined" sx={{ mb: 2 }} fullWidth />
        <TextField label="Konfirmasi Password" variant="outlined" fullWidth />
        <Button variant="contained" fullWidth sx={{ mt: 3 }}>Register</Button>
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
