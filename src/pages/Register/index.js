import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateAuth } from '../../redux/sliceAuth';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        <TextField label="Email" variant="outlined" fullWidth sx={{ mt: 5, mb: 2 }} />
        <TextField label="Password" variant="outlined" sx={{ mb: 2 }} fullWidth />
        <TextField label="Konfirmasi Password" variant="outlined" fullWidth />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={() => {
            dispatch(updateAuth('token dummy'));
            navigate('/');
          }}
        >
          Register
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
