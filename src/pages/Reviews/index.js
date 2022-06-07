import {
  Container,
  Typography,
  Box,
  Avatar,
  Divider,
  Rating,
} from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import React from 'react';

function ReviewItem() {
  return (
    <Box boxShadow="0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))" p={2}>
      <Box display="flex" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.25} mb={1.8} flexDirection={{ xs: 'column', md: 'row' }}>
        <Box display="flex" gap={1.25} alignItems="center">
          <ShoppingBag fontSize="small" sx={{ color: 'rgb(3, 172, 14)' }} />
          <Typography fontWeight={800} fontSize={12}>Belanja</Typography>
          <Typography fontSize={12} color="text.secondary">22 Apr 2022</Typography>
        </Box>
      </Box>
      <Typography fontSize={12} fontWeight={800} mb={1.25} textAlign={{ xs: 'left', sm: 'center', md: 'left' }}>Pakaian Anak Grosir Bekasi</Typography>
      <Box display="flex" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={{ xs: 2, md: 4, lg: 8 }} flexDirection={{ xs: 'column', md: 'row' }}>
        <Box display="flex" gap={2} alignItems="center">
          <Avatar src="https://source.unsplash.com/random" variant="square" alt="baju muslim" sx={{ width: 60, height: 60 }} />
          <Box>
            <Typography fontSize={14} fontWeight={800} gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
            <Rating value={4.5} precision={0.5} readOnly />
          </Box>
        </Box>
        <Divider orientation="vertical" sx={{ height: 50, display: { xs: 'none', md: 'block' } }} />
        <Box>
          <Typography fontSize={14} fontWeight={800}>Ulasan :</Typography>
          <Typography fontSize={14} color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Explicabo, deleniti laborum neque sint quaerat consequuntur
            excepturi voluptate porro placeat aliquam quam nulla omnis
            tempore tempora adipisci officiis. Temporibus, officia doloribus!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function Reviews() {
  return (
    <Container>
      <Box display="flex" flexDirection="column" gap={2}>
        {
          [1, 2, 3].map(() => (
            <ReviewItem />
          ))
        }
      </Box>
    </Container>
  );
}

export default Reviews;
