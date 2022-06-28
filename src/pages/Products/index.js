/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { Delete, Edit } from '@mui/icons-material';
import moment from 'moment';
import {
  Container,
  Box,
  Button,
  Avatar,
  Typography,
  Switch,
  Grid,
  IconButton,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { DataGrid } from '@mui/x-data-grid';
import { DialogCreateProduct } from '../../components';
import {
  getProductsUmkm, putStatusProduct, rp, deleteProduct,
} from '../../utils';

function DeleteButtonProduct({ idItem, onSuccess, enqueueSnackbar }) {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteCategory = async () => {
    try {
      setLoadingDelete(true);
      const product = await deleteProduct(idItem);
      if (product.status !== 'success') {
        throw new Error(product.message);
      }
      setLoadingDelete(false);
      onSuccess();
    } catch (err) {
      setLoadingDelete(false);
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };
  return (
    <Box display="flex" alignItems="center">
      { loadingDelete && <Typography color="text.secondary" fontSize={10}>Loading..</Typography>}
      { !loadingDelete && (
        <IconButton
          color="error"
          aria-label="delete category"
          component="span"
          size="small"
          onClick={handleDeleteCategory}
        >
          <Delete size="small" />
        </IconButton>
      )}
    </Box>
  );
}

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
        <Box display="flex" gap={1}>
          <IconButton
            color="primary"
            aria-label="edit category"
            component="span"
            size="small"
            onClick={() => setOpenDialogProduct({ open: true, data: params.row, action: 'edit' })}
          >
            <Edit size="small" />
          </IconButton>
          <DeleteButtonProduct
            idItem={params.row.id_item}
            enqueueSnackbar={enqueueSnackbar}
            onSuccess={() => {
              setProductsState({
                ...productsState,
                data: productsState.data.filter((row) => row.id_item !== params.row.id_item),
              });
            }}
          />
        </Box>
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
