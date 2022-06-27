/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { Edit } from '@mui/icons-material';
import moment from 'moment';
import {
  Container,
  Box,
  Button,
  Avatar,
  Typography,
  Switch,
  Grid,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { DataGrid } from '@mui/x-data-grid';
import { DialogCreateProduct } from '../../components';
import { getProductsUmkm, putStatusProduct, rp } from '../../utils';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function StatusSwitch({ id, isActive }) {
  const [checkedState, setCheckedState] = useState({
    isActive,
    loading: false,
    message: null,
  });

  const handleChecked = async (e) => {
    const { checked } = e.target;
    setCheckedState({ ...checkedState, loading: true });
    try {
      const product = await putStatusProduct(id, { status: checked ? 'aktif' : 'tidak aktif' });
      if (product.status !== 'success') {
        throw new Error(product.message);
      }
      setCheckedState({ ...checkedState, loading: false, isActive: checked });
    } catch (err) {
      setCheckedState({ ...checkedState, loading: false, message: err.message });
    }
  };

  if (checkedState.loading) {
    return <Typography fontSize={12} color="text.secondary">Loading ...</Typography>;
  }

  if (!checkedState.loading && checkedState.message) {
    return <Typography fontSize={12} color="text.secondary">{checkedState.message}</Typography>;
  }

  return (
    <Switch
      {...label}
      checked={checkedState.isActive}
      onChange={handleChecked}
    />
  );
}

function Products() {
  const { enqueueSnackbar } = useSnackbar();
  const [openDialogProduct, setOpenDialogProduct] = useState({
    action: null,
    open: false,
    data: null,
  });
  const [productsState, setProductsState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchProducts = async () => {
    setProductsState({ ...productsState, loading: true });
    try {
      const products = await getProductsUmkm();
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
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    {
      field: 'foto',
      headerName: '',
      renderCell: (params) => <Avatar src={params.row.foto} />,
      sortable: false,
      disableColumnMenu: true,
      width: 70,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'name',
      headerName: 'Produk',
      minWidth: 400,
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Harga(Rp)',
      width: 150,
      renderCell: (params) => rp(params.row.price),
    },
    {
      field: 'stock',
      headerName: 'Stok',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'created_at',
      headerName: 'Created',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Aktif',
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => <StatusSwitch id={params.id} isActive={params.row.status === 'aktif'} />,
    },
    {
      field: 'id',
      headerName: '',
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Button
          color="success"
          onClick={() => {
            setOpenDialogProduct({ open: true, data: params.row, action: 'edit' });
          }}
          startIcon={<Edit />}
          sx={{
            textTransform: 'capitalize',
            fontWeight: 800,
            fontSize: 12,
          }}
        >
          Ubah
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <Grid container mb={2}>
        <Grid item xs={6}>
          <Button
            onClick={() => setOpenDialogProduct({ open: true, data: null, action: 'add' })}
            variant="contained"
            sx={{
              fontSize: 14,
              textTransform: 'capitalize',
              fontWeight: 800,
            }}
          >
            Tambah Produk
          </Button>
        </Grid>
      </Grid>
      {
        productsState.loading && (
          <Box display="grid" justifyContent="center" p={6}>
            <Typography>Loading ...</Typography>
          </Box>
        )
      }
      {
        (!productsState.loading && productsState.message) && (
          <Box display="grid" justifyContent="center" p={6}>
            <Typography>{productsState.message}</Typography>
          </Box>
        )
      }
      {
        (!productsState.loading && productsState.data) && (
          <Box height={500}>
            <DataGrid
              rows={productsState.data.map((row) => ({
                ...row,
                created_at: moment(row.created_at).format('YYYY-MM-DD HH:mm'),
              }))}
              columns={columns}
            />
          </Box>
        )
      }
      <DialogCreateProduct
        open={openDialogProduct.open}
        data={openDialogProduct.data}
        action={openDialogProduct.action}
        onSuccess={fetchProducts}
        onClose={() => setOpenDialogProduct({ open: false, data: null, action: null })}
      />
    </Container>
  );
}

export default Products;
