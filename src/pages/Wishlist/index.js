import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { CardProduct } from '../../components';
import { getProductsWishlist } from '../../utils';

function Wishlist() {
  const [productsState, setProductsState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchProducts = async () => {
    setProductsState({ ...productsState, loading: true });
    try {
      const products = await getProductsWishlist();
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
        <>
          {productsState.data.length !== 0 && (
            <>
              <Typography variant="h5" fontWeight={700}>Wishlist</Typography>
              <Typography color="text.secondary" mb={2}>
                <strong>{productsState.data.length}</strong>
                {' '}
                barang
              </Typography>
              <Grid container spacing={{ xs: 1, lg: 1.5 }}>
                {
                  productsState.data.map((row) => (
                    <Grid key={row.id_item} item xs={6} sm={3} lg={2}>
                      <CardProduct key={row} data={row} />
                    </Grid>
                  ))
                }
              </Grid>
            </>
          )}
          {productsState.data.length === 0 && (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" py={6}>
                <Typography color="text.secondary">
                  Tidak ada produk
                </Typography>
              </Box>
            </Grid>
          )}
        </>
      )}
    </Container>
  );
}

export default Wishlist;
