import {
  Container,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
} from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import React from 'react';

function OrderItem() {
  return (
    <Box boxShadow="0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))" p={2}>
      <Box display="flex" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.25} mb={1.8} flexDirection={{ xs: 'column', md: 'row' }}>
        <Box display="flex" gap={1.25} alignItems="center">
          <ShoppingBag fontSize="small" sx={{ color: 'rgb(3, 172, 14)' }} />
          <Typography fontWeight={800} fontSize={12}>Belanja</Typography>
          <Typography fontSize={12} color="text.secondary">22 Apr 2022</Typography>
          <Box px={1} py={0.2} bgcolor="rgb(214, 255, 222)">
            <Typography fontSize={12} fontWeight={800} sx={{ color: 'rgb(3, 172, 14)' }}>Selesai</Typography>
          </Box>
        </Box>
        <Typography fontSize={12} color="text.secondary">INV/20220415/MPL/2234203270</Typography>
      </Box>
      <Typography fontSize={12} fontWeight={800} mb={1.25} textAlign={{ xs: 'left', sm: 'center', md: 'left' }}>Pakaian Anak Grosir Bekasi</Typography>
      <Box display="flex" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={{ xs: 2, md: 4, lg: 8 }} flexDirection={{ xs: 'column', md: 'row' }}>
        <Box display="flex" gap={2}>
          <Avatar src="https://source.unsplash.com/random" variant="square" alt="baju muslim" sx={{ width: 60, height: 60 }} />
          <Box>
            <Typography fontSize={14} fontWeight={800}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
            <Typography fontSize={12} color="text.secondary" fontWeight={400}>1 barang x Rp20.230</Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" sx={{ height: 50, display: { xs: 'none', md: 'block' } }} />
        <Box>
          <Typography fontSize={12} color="text.secondary" fontWeight={400}>Total Belanja</Typography>
          <Typography fontSize={14} fontWeight={800}>
            Rp 100.300
          </Typography>
        </Box>
        <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} width="100%" maxWidth={350} gap={{ xs: 1, md: 2 }}>
          <Button fullWidth variant="contained">Beri Ulasan</Button>
          <Button fullWidth variant="outlined">Detail</Button>
        </Box>
      </Box>
    </Box>
  );
}

function Order() {
  return (
    <Container>
      <Box display="flex" flexDirection="column" gap={2}>
        {
          [1, 2, 3, 4, 5].map(() => (
            <OrderItem />
          ))
        }
      </Box>
    </Container>
  );
}

export default Order;
