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
import { getProducts, rp } from '../../utils';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function Products() {
  const { enqueueSnackbar } = useSnackbar();
  const [openDialogProduct, setOpenDialogProduct] = useState(false);
  const [productsState, setProductsState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchProducts = async () => {
    setProductsState({ ...productsState, loading: true });
    try {
      const products = await getProducts();
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

  return (
    <Container>
      <Grid container mb={2}>
        <Grid item xs={6}>
          <Button
            onClick={() => setOpenDialogProduct(true)}
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
                {productsState.data.map((row) => (
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
                    <TableCell align="center"><Switch {...label} checked={row.status === 'aktif'} /></TableCell>
                    <TableCell align="center">
                      <Button
                        sx={{
                          textTransform: 'capitalize',
                          fontWeight: 800,
                        }}
                        startIcon={<Edit />}
                      >
                        Ubah
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
      <DialogCreateProduct
        open={openDialogProduct}
        onClose={() => setOpenDialogProduct(false)}
      />
    </Container>
  );
}

export default Products;
