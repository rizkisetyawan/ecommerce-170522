import {
  Container,
  Box,
  Typography,
} from '@mui/material';
import React from 'react';

function Payment() {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        border="0.5px solid rgb(232, 232, 232)"
        borderRadius={1}
        p={2}
      >
        <Typography fontSize={20} fontWeight={800}>Selesaikan pembayaran dalam</Typography>
        <Typography>20:</Typography>
      </Box>
    </Container>
  );
}

export default Payment;
