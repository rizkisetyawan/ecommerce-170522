import {
  Box, Container, Grid, Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CardProduct, CardToko } from '../../components';
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
  }, [title]);

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
          {productsState.data.toko.length !== 0 && (
            <Box mb={4}>
              <Typography color="text.secondary" mb={2}>
                Menampilkan
                {' '}
                {productsState.data.toko.length}
                {' '}
                toko untuk
                {' '}
                <strong>
                  &#34;
                  {title}
                  &#34;
                </strong>
              </Typography>
              <Grid container spacing={{ xs: 1, lg: 1.5 }}>
                {
                  productsState.data.toko.map((row) => (
                    <Grid key={row.id_item} item xs={6} sm={3} lg={2}>
                      <CardToko data={row} />
                    </Grid>
                  ))
                }
              </Grid>
            </Box>
          )}
          {productsState.data.products.length !== 0 && (
            <>
              <Typography color="text.secondary" mb={2}>
                Menampilkan
                {' '}
                {productsState.data.products.length}
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
                  productsState.data.products.map((row) => (
                    <Grid key={row.id_item} item xs={6} sm={3} lg={2}>
                      <CardProduct data={row} />
                    </Grid>
                  ))
                }
              </Grid>
            </>
          )}
          {(productsState.data.products.length === 0 && productsState.data.toko.length === 0) && (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" py={6}>
                <Typography color="text.secondary">
                  Tidak ada produk atau toko
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
