/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box, Container, Typography, Avatar, Rating, Grid,
} from '@mui/material';
import moment from 'moment';

import Category from './Category';
import { getAllProduct, rp } from '../../utils';

function AdminProduct() {
  const [productsState, setProductsState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchProducts = async () => {
    setProductsState({ ...productsState, loading: true });
    try {
      const products = await getAllProduct();
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

  const columns = [
    {
      field: 'foto',
      headerName: '',
      renderCell: (params) => <Avatar src={params.row.foto} sx={{ borderRadius: 1 }} variant="square" />,
      sortable: false,
      disableColumnMenu: true,
      width: 70,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'name',
      headerName: 'Nama',
      minWidth: 400,
      flex: 1,
    },
    {
      field: 'umkm_name',
      headerName: 'Toko',
    },
    {
      field: 'category',
      headerName: 'Kategori',
    },
    {
      field: 'rating',
      headerName: 'Rating',
      align: 'center',
      headerAlign: 'center',
      width: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Rating precision={0.5} size="small" value={params.row.rating} readOnly />
          <Typography color="success.light" fontSize={14} fontWeight={700}>
            {params.row.rating?.toFixed(1)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'sold',
      headerName: 'Terjual',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'stock',
      headerName: 'Stok',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'price',
      headerName: 'Harga',
    },
    {
      field: 'created_at',
      headerName: 'Created',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ width: '100%', padding: '0 !important' }}>
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
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8} height="calc(100vh - 112px)">
            <DataGrid
              rows={productsState.data.map((row) => ({
                ...row,
                price: rp(row.price),
                created_at: moment(row.created_at).format('YYYY-MM-DD HH:mm'),
              }))}
              columns={columns}
            />
          </Grid>
          <Grid item xs={12} lg={4} height={500} mt={{ xs: 4, lg: 0 }}>
            <Category />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default AdminProduct;
