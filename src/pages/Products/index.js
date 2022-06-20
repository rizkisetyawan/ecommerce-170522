/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { Edit, Search } from '@mui/icons-material';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Avatar,
  Typography,
  Switch,
  TextField,
  InputAdornment,
  Grid,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
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
  const [searchState, setSearchState] = useState(null);

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

  const handleSearchProduct = (e) => {
    const { value } = e.target;
    if (!value) {
      setSearchState(null);
    } else {
      setSearchState(productsState.data.filter((row) => row.name.includes(e.target.value)));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <TextField
              sx={{
                '& input, & input::placeholder': {
                  fontSize: 14,
                },
                width: 150,
              }}
              id="input-with-icon-textfield"
              placeholder="Search ..."
              onChange={handleSearchProduct}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Box>
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
          <>
            <TableContainer component={Paper} sx={{ boxShadow: 'rgb(0 0 0 / 12%) 0px 1px 6px 0px' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800 }}>Info Produk</TableCell>
                    <TableCell sx={{ fontWeight: 800 }} align="center">Harga(Rp)</TableCell>
                    <TableCell sx={{ fontWeight: 800 }} align="center">Stok</TableCell>
                    <TableCell sx={{ fontWeight: 800 }} align="center">Aktif</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(searchState || productsState.data).map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Box display="flex" gap={1.5} alignItems="center">
                          <Avatar
                            variant="square"
                            src={row.foto}
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 1,
                            }}
                          />
                          <Typography fontSize={14} fontWeight={800} color="text.secondary">
                            {row.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{rp(row.price)}</TableCell>
                      <TableCell align="center">{row.stock}</TableCell>
                      <TableCell align="center">
                        <StatusSwitch
                          id={row.id_item}
                          isActive={row.status === 'aktif'}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="inherit"
                          onClick={() => {
                            setOpenDialogProduct({ open: true, data: row, action: 'edit' });
                          }}
                          startIcon={<Edit />}
                          sx={{
                            textTransform: 'capitalize',
                            fontWeight: 800,
                          }}
                        >
                          Ubah
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {(productsState.data.length === 0) && (
              <Box display="grid" justifyContent="center" py={6}>
                <Typography color="text.secondary">Tidak ada produk</Typography>
              </Box>
            )}
          </>
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
