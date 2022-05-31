/* eslint-disable react/prop-types */
import {
  Container,
  Grid,
  Typography,
  Divider,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import {
  AddCircleOutline,
  Delete,
  RemoveCircleOutline,
} from '@mui/icons-material';
import React, { useState } from 'react';
import { PayModal } from '../../components';

function Cart() {
  const [openModalState, setOpenModalState] = useState(false);

  return (
    <Container sx={{ my: 4 }}>
      <Grid container spacing={{ xs: 5, lg: 8 }}>
        <Grid item xs={12} lg={8}>
          <Typography fontSize={20} fontWeight={800} mb={4}>Keranjang</Typography>
          {[1, 2, 3, 4, 5].map(() => (
            <>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" gap={1} mb={0.5}>
                <img
                  alt="Remy Sharp"
                  src="https://source.unsplash.com/random"
                  style={{
                    width: 20, height: 20, objectFit: 'cover',
                  }}
                />
                <Typography fontSize={14} fontWeight={600}>Orca Jaya</Typography>
              </Box>
              <Typography fontSize={12} color="text.secondary">Jakarta Barat</Typography>
              <Box display="flex" mt={2}>
                <Box>
                  <img
                    src="https://source.unsplash.com/random"
                    style={{
                      height: 70, width: 70, borderRadius: 8, objectFit: 'cover',
                    }}
                    alt="cart profuct"
                  />
                </Box>
                <Box ml={2}>
                  <Typography fontSize={14} color="text.secondary" gutterBottom>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure, dicta?</Typography>
                  <Typography fontSize={14} fontWeight={800}>Rp750.000</Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Typography fontSize={12} color="text.secondary">Pindahkan ke Wishlist</Typography>
                <Divider orientation="vertical" sx={{ mx: 1, height: 32, ml: { xs: 3, lg: 6 } }} />
                <IconButton color="default">
                  <Delete />
                </IconButton>
                <Divider orientation="vertical" sx={{ mx: 1, height: 32, mr: { xs: 3, lg: 6 } }} />
                <RemoveCircleOutline color="disabled" />
                <Box borderBottom="1px solid #f0f0f0">
                  <Typography mx={2} color="text.secondary" fontWeight={600}>5</Typography>
                </Box>
                <AddCircleOutline color="primary" />
              </Box>
            </>
          ))}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box border="1px solid #e5e7e9" borderRadius={2} p={2} py={4}>
            <Typography fontWeight={600} mb={2}>Ringkasan Belanja</Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography fontSize={14} color="text.secondary">Total Harga (2 barang)</Typography>
              <Typography fontSize={14} color="text.secondary">Rp1.829.000</Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-between" my={2}>
              <Typography fontWeight={800}>Total Harga</Typography>
              <Typography fontWeight={800}>Rp3.085.000</Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, fontWeight: 800, fontSize: 16 }}
              onClick={() => setOpenModalState(true)}
            >
              Beli (3)
            </Button>
          </Box>
        </Grid>
      </Grid>
      <PayModal open={openModalState} onClose={() => setOpenModalState(false)} />
    </Container>
  );
}

export default Cart;
