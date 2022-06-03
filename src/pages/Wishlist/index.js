import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { CardProduct } from '../../components';

function Wishlist() {
  return (
    <Container>
      <Typography variant="h5" fontWeight={700} mb={2}>Wishlist</Typography>
      <Grid container spacing={{ xs: 1, lg: 1.5 }}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) => (
            <Grid item xs={6} sm={3} lg={2}>
              <CardProduct key={row} imgUrl="https://source.unsplash.com/random" />
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
}

export default Wishlist;
