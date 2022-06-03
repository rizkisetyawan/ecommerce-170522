import {
  Container,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import React from 'react';

function Order() {
  return (
    <Container>
      <Box boxShadow="0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))" p={2}>
        <Box display="flex" alignItems="center" gap={1.25} mb={1.8}>
          <ShoppingBag fontSize="small" sx={{ color: 'rgb(3, 172, 14)' }} />
          <Typography fontWeight={800} fontSize={12}>Belanja</Typography>
          <Typography fontSize={12} color="text.secondary">22 Apr 2022</Typography>
          <Box px={1} py={0.2} bgcolor="rgb(214, 255, 222)">
            <Typography fontSize={12} fontWeight={800} sx={{ color: 'rgb(3, 172, 14)' }}>Selesai</Typography>
          </Box>
          <Typography fontSize={12} color="text.secondary">INV/20220415/MPL/2234203270</Typography>
        </Box>
        <Typography fontSize={12} fontWeight={800} mb={1.25}>Pakaian Anak Grosir Bekasi</Typography>
        <Box>
          <Avatar src="https://source.unsplash.com/random" variant="square" alt="baju muslim" sx={{ width: 60, height: 60 }} />
        </Box>
      </Box>
    </Container>
  );
}

export default Order;
