import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { CardProduct } from '../../components';

function Category() {
  const { title } = useParams();
  return (
    <Container>
      <Typography color="text.secondary" mb={2}>
        Menampilkan 79 produk untuk
        {' '}
        <Typography fontWeight={700} component="span" color="text.secondary">
          &#34;
          {title}
          &#34;
        </Typography>
      </Typography>
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

export default Category;
