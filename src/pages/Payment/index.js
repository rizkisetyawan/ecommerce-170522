import {
  Container,
  Box,
  Typography,
  Avatar,
  Grid,
  Button,
} from '@mui/material';
import { ContentCopy, Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Payment() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <Box
        border={0.5}
        borderColor="divider"
        borderRadius={1}
        p={2}
        pb={4}
        mb={2}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontSize={20} fontWeight={800}>Transfer Bank</Typography>
          <Avatar src="logoBank/bca.png" variant="square" alt="testing" sx={{ '& img': { objectFit: 'contain' }, width: 80, height: 80 }} />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography fontSize={14} color="text.secondary">Nomor Rekening</Typography>
            <Typography fontSize={18} fontWeight={800}>372 178 6923</Typography>
            <Typography fontSize={14} color="text.secondary">PT. Makmur Sejahtera (Kedoya Permai)</Typography>
          </Box>
          <Box display="flex" gap={0.5} alignItems="center">
            <Typography fontWeight={800} color="success.light">Salin</Typography>
            <ContentCopy fontSize="small" sx={(theme) => ({ color: theme.palette.success.light })} />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography fontSize={14} color="text.secondary">Total Pembayaran</Typography>
            <Typography fontSize={18} color="error.main" fontWeight={800}>
              Rp3.654.
              <Typography fontSize={18} fontWeight={800} component="span" color="success.light">690</Typography>
            </Typography>
          </Box>
          <Typography fontWeight={800} color="success.light">Lihat Detail</Typography>
        </Box>
        <Box
          p={2}
          border={1}
          borderColor="#70eafa"
          borderRadius={1}
          bgcolor="#ebfffe"
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Info sx={{ color: 'rgb(40, 185, 225)' }} />
          <Box>
            <Typography fontWeight={800}>Penting!</Typography>
            <Box display="flex" gap={0.5}>
              <Typography fontSize={14} color="text.secondary">1.</Typography>
              <Typography fontSize={14} color="text.secondary">
                Transfer tepat hingga
                <span style={{ fontWeight: 800 }}>3 digit terakhir</span>
              </Typography>
            </Box>
            <Box display="flex" gap={0.5}>
              <Typography fontSize={14} color="text.secondary">2.</Typography>
              <Typography fontSize={14} color="text.secondary">Tidak disarankan transfer melalui LLG/Kliring/SKBNI</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12} sm={6}>
          <Button fullWidth variant="outlined" sx={{ fontWeight: 800 }}>Cek Status Pembayaran</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate('/')}
            sx={{ fontWeight: 800 }}
          >
            Belanja Lagi
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Payment;
