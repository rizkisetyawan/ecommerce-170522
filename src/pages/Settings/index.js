import {
  Avatar,
  Container,
  Grid,
  Box,
  Button,
  Typography,
} from '@mui/material';
import React from 'react';

function Settings() {
  return (
    <Container>
      <Grid container p={{ xs: 0, md: 2 }} spacing={{ xs: 2, md: 6 }}>
        <Grid item xs={12} md={4}>
          <Box
            p={2}
            borderRadius={1}
            boxShadow="0 1px 6px 0 rgba(49,53,59,0.12)"
          >
            <Avatar
              src="https://source.unsplash.com/random"
              alt="profil"
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 300,
                mb: 2,
              }}
              variant="square"
            />
            <Button
              fullWidth
              variant="outlined"
              sx={{
                fontSize: 14,
                fontWeight: 800,
                color: 'text.primary',
                borderColor: 'divider',
                mb: 2,
              }}
            >
              Pilih Foto
            </Button>
            <Typography fontSize={12} color="text.secondary">
              Besar file: maksimum 10.000.000 bytes (10 Megabytes).
              Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box px={2}>
            <Typography fontSize={14} color="text.secondary" fontWeight={800} my={2}>Ubah Biodata Diri</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4} lg={2}><Typography fontSize={13} color="text.secondary">Nama</Typography></Grid>
              <Grid item xs={8} lg={10}>
                <Typography fontSize={13} color="text.secondary">
                  Rizki Setyawan
                  <span style={{ display: 'inline-block', width: 20 }} />
                  <span style={{ color: '#03ac0e' }}>Ubah</span>
                </Typography>
              </Grid>
              <Grid item xs={4} lg={2}><Typography fontSize={13} color="text.secondary">Tanggal Lahir</Typography></Grid>
              <Grid item xs={8} lg={10}>
                <Typography fontSize={13} color="text.secondary">
                  5 September 1999
                  <span style={{ display: 'inline-block', width: 20 }} />
                  <span style={{ color: '#03ac0e' }}>Ubah</span>
                </Typography>
              </Grid>
              <Grid item xs={4} lg={2}><Typography fontSize={13} color="text.secondary">Jenis Kelamin</Typography></Grid>
              <Grid item xs={8} lg={10}>
                <Typography fontSize={13} color="text.secondary">
                  Pria
                  <span style={{ display: 'inline-block', width: 20 }} />
                  <span style={{ color: '#03ac0e' }}>Ubah</span>
                </Typography>
              </Grid>
            </Grid>
            <Typography fontSize={14} color="text.secondary" fontWeight={800} mb={2} mt={4}>Ubah Kontak</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4} lg={2}><Typography fontSize={13} color="text.secondary">Email</Typography></Grid>
              <Grid item xs={8} lg={10}>
                <Typography fontSize={13} color="text.secondary">
                  rizkisetyawan@gmail.com
                  <span style={{ display: 'inline-block', width: 20 }} />
                  <span style={{ color: '#03ac0e' }}>Ubah</span>
                </Typography>
              </Grid>
              <Grid item xs={4} lg={2}><Typography fontSize={13} color="text.secondary">Nomor HP</Typography></Grid>
              <Grid item xs={8} lg={10}>
                <Typography fontSize={13} color="text.secondary">
                  08121212129
                  <span style={{ display: 'inline-block', width: 20 }} />
                  <span style={{ color: '#03ac0e' }}>Ubah</span>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Settings;
