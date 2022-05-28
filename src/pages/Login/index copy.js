/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container
      component="main"
      // maxWidth="xs"
      sx={{
        mt: 8, py: 4, px: 1, boxShadow: '0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))', maxWidth: 400,
      }}
    >
      {/* <CssBaseline /> */}
      <Box
        sx={{
          // marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{
          width: '100%', display: 'flex', alignItems: 'center',
        }}
        >
          <Box sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
          }}
          >
            <Typography component="h1" variant="h5" fontWeight={600}>
              Masuk
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }} />
          <Link href="#" variant="body2">
            Daftar
          </Link>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Link href="#" variant="body2" textAlign="right" display="block">
            Lupa kata sandi?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign In
          </Button>
          <Typography variant="subtitle2" color="textSecondary" textAlign="center">
            Butuh bantuan? Hubungi
            {' '}
            <Link href="#" variant="body2">
              Admin
            </Link>
          </Typography>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8 }} />
    </Container>
  );
}

export default Login;
