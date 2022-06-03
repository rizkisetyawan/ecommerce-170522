/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {
  Box,
  Container,
  Grid,
  Typography,
  Rating,
  Divider,
  LinearProgress,
  IconButton,
  Button,
  Avatar,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Add, Remove } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addCount } from '../../redux/sliceCart';
import { PayModal } from '../../components';

function Product() {
  const dispatch = useDispatch();
  const [openModalState, setOpenModalState] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={12} lg={4}>
          <Box>
            <img width="100%" src="https://source.unsplash.com/random" alt="gambar produk" style={{ maxHeight: 300, objectFit: 'cover' }} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Box>
            <Typography
              fontSize={18}
              fontWeight={800}
            >
              Pintar Facil Smart Paint Roll untuk cat tembok tanpa belepotan
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Typography fontSize={14} fontWeight={400} color="text.secondary">Terjual 192</Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <Rating defaultValue={1} max={1} size="small" readOnly />
                <Typography fontSize={14} fontWeight={400}>4.6</Typography>
                <Typography fontSize={14} fontWeight={400} color="text.secondary">(156 ulasan)</Typography>
              </Box>
            </Box>
            <Typography fontSize={28} fontWeight={800} my={2}>Rp155.000</Typography>
            <Divider width="100%" sx={{ mb: 1 }} />
            <Typography color="primary.main" fontWeight={600} gutterBottom>Keterangan</Typography>
            <Typography fontSize={14}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia esse, quaerat tempore rem explicabo nostrum nam officiis aliquid nihil facere.</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Box border="1px solid #e5e7e9" borderRadius={2} p={2} py={4}>
            <Typography fontWeight={600} mb={2}>Atur jumlah</Typography>
            <Box display="flex" gap={1.5} alignItems="center">
              <Box borderRadius={0.5} border="1px solid #bfc9d9" display="flex" alignItems="center">
                <IconButton color="primary">
                  <Add />
                </IconButton>
                <Typography color="text.secondary" mx={2}>3</Typography>
                <IconButton color="primary">
                  <Remove />
                </IconButton>
              </Box>
              <Typography fontSize={14}>
                Stok
                {' '}
                <Typography component="span" fontSize={14} fontWeight={600}>1.925</Typography>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2} my={2}>
              <Typography>Subtotal</Typography>
              <Typography fontSize={20} fontWeight={800}>Rp203.000</Typography>
            </Box>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    fontSize: 13, whiteSpace: 'nowrap', px: 1, textTransform: 'capitalize', fontWeight: 800,
                  }}
                  onClick={() => setOpenModalState(true)}
                >
                  Beli Langsung
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    fontSize: 13, whiteSpace: 'nowrap', px: 1, textTransform: 'capitalize', fontWeight: 800,
                  }}
                  onClick={() => dispatch(addCount())}
                >
                  + Keranjang
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Typography fontWeight={800} gutterBottom>ULASAN (156)</Typography>
          <Typography fontSize={14}>Pintar Facil Smart Paint Roll untuk cat tembok tanpa belepotan</Typography>
          <Box display="flex" gap={{ xs: 2, sm: 7 }} alignItems="center" my={2} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
            <Box>
              <Typography fontSize={60} textAlign="center">
                4.6
                <Typography display="inline-block" color="text.secondary" ml={0.5}>/5</Typography>
              </Typography>
              <Rating defaultValue={5} readOnly size="large" sx={{ mt: -1 }} />
              <Typography fontSize={12} color="text.secondary" textAlign="center">(156) Ulasan</Typography>
            </Box>
            <Box>
              {[105, 81, 40, 10, 0].map((row, index) => {
                const result = [105, 81, 40, 10, 0].reduce((acc, val) => acc + val, 0);
                const formula = (row * 100) / result;
                return (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Rating defaultValue={1} max={1} readOnly size="small" />
                    <Typography fontSize={14} fontWeight={600} color="text.secondary">{index + 1}</Typography>
                    <Box width={100} mx={{ xs: 0, sm: 1 }}>
                      <LinearProgress variant="determinate" value={formula} />
                    </Box>
                    <Typography fontSize={14} color="text.secondary" justifySelf="flex-end">{row}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6.5}>
          <Typography fontSize={12} fontWeight={800} color="text.secondary">SEMUA ULASAN (156)</Typography>
          {[1, 2, 3, 4, 5].map(() => (
            <Box display="flex" gap={2} my={3}>
              <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" />
              <Box>
                <Typography fontSize={12} color="primary.main" fontWeight={800}>Nunu</Typography>
                <Typography fontSize={12} color="text.secondary" whiteSpace="nowrap">2 minggu lalu</Typography>
              </Box>
              <Box>
                <Rating defaultValue={5} size="small" readOnly />
                <Typography fontSize={14}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium corporis dolorum omnis reiciendis, amet possimus, ipsum officia labore quam aut quas nemo recusandae vitae, obcaecati molestiae saepe? Velit, perspiciatis quae?</Typography>
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
      <PayModal open={openModalState} onClose={() => setOpenModalState(false)} />
    </Container>
  );
}

export default Product;
