import {
  Box, Container, Grid, Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CardProduct } from '../../components';
import { getProductsSearch } from '../../utils';

function Search() {
  const { title } = useParams();
  const [productsState, setProductsState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchProducts = async () => {
    setProductsState({ ...productsState, loading: true });
    try {
      const products = await getProductsSearch(title);
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
              <Typography color="text.secondary" mb={2}>
                Menampilkan
                {' '}
                {productsState.data.length}
                {' '}
                produk untuk
                {' '}
                <strong>
                  &#34;
                  {title}
                  &#34;
                </strong>
              </Typography>
              <Grid container spacing={{ xs: 1, lg: 1.5 }}>
                {
                  productsState.data.map((row) => (
                    <Grid item xs={6} sm={3} lg={2}>
                      <CardProduct key={row} data={productsState.data} />
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
                  {' '}
                  <strong>
                    &#34;
                    {title}
                    &#34;
                  </strong>
                </Typography>
              </Box>
            </Grid>
          )}
        </>
      )}
    </Container>
  );
}

export default Search;
