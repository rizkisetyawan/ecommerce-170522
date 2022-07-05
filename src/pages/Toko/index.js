import { LocationOn } from '@mui/icons-material';
import {
  Avatar,
  Box, Container, Grid, Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CardProduct } from '../../components';
import { getProductsToko } from '../../utils';

function Toko() {
  const { idToko } = useParams();
  const [productsState, setProductsState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchProducts = async () => {
    setProductsState({ ...productsState, loading: true });
    try {
      const products = await getProductsToko(idToko);
      if (products.status !== 'success') {
        throw new Error(products.message);
      }
      setProductsState({
        ...productsState,
        loading: false,
        data: products.data,
      });
    } catch (err) {
      setProductsState({
        ...productsState,
        loading: false,
        message: err.message,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      { productsState.loading && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { (!productsState.loading && productsState.message) && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">{productsState.message}</Typography>
        </Box>
      )}
      { (!productsState.loading && productsState.data) && (
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={3}>
            <Box>
              <Box display="flex" gap={2} flexDirection={{ xs: 'row', md: 'column' }} alignItems="center">
                <Avatar
                  src={productsState.data.toko.foto}
                  sx={{ width: { xs: 70, md: 150 }, height: { xs: 70, md: 150 }, mt: 2 }}
                />
                <Box>
                  <Typography sx={{ mt: 2, fontWeight: 800 }}>
                    {productsState.data.toko.name}
                  </Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    {productsState.data.toko.description}
                  </Typography>
                  <Box display="flex" gap={1} alignItems="center">
                    <LocationOn color="error" />
                    <Typography color="text.secondary" fontSize={14}>
                      {productsState.data.toko.address}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          {productsState.data.products.length !== 0 && (
            <Grid item xs={12} md={9}>
              <Typography color="text.secondary" mb={2}>
                Tersedia
                {' '}
                {productsState.data.products.length}
                {' '}
                Produk
              </Typography>
              <Grid container spacing={{ xs: 1, lg: 1.5 }}>
                {
                  productsState.data.products.map((row) => (
                    <Grid key={row.id_item} item xs={6} sm={3} lg={3}>
                      <CardProduct data={row} />
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
          )}
          {productsState.data.products.length === 0 && (
            <Grid item xs={12} md={9}>
              <Box display="flex" justifyContent="center" py={6}>
                <Typography color="text.secondary">
                  Tidak ada produk
                  {' '}
                  <strong>
                    &#34;
                    {productsState.data.toko.name}
                    &#34;
                  </strong>
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
}

export default Toko;
