/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Container,
  Grid,
  Typography,
  Divider,
  Box,
  IconButton,
  Button,
  Avatar,
} from '@mui/material';
import {
  AddCircleOutline,
  Delete,
  RemoveCircleOutline,
} from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { addCount, initCart, reduceCount } from '../../redux/sliceCart';
import { PayModal } from '../../components';
import { getCart, rp } from '../../utils';

const totalPrice = (data) => {
  let result = 0;
  data.forEach((row) => {
    const accPrice = row.qty * Number(row.price);
    result += accPrice;
  });
  return result;
};

function CartItem({ onAddCart, onReduceCart, data }) {
  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" gap={1} mb={0.5}>
        <Avatar
          alt={data.name}
          src={data.foto_umkm}
          style={{
            width: 20, height: 20,
          }}
        />
        <Typography fontSize={14} fontWeight={600}>{data.name_umkm}</Typography>
      </Box>
      {/* <Typography fontSize={12} color="text.secondary">{data.address_umkm}</Typography> */}
      <Box display="flex" mt={2}>
        <Box>
          <img
            src={data.foto}
            style={{
              height: 70, width: 70, borderRadius: 8, objectFit: 'cover',
            }}
            alt={data.name}
          />
        </Box>
        <Box ml={2}>
          <Typography fontSize={14} color="text.secondary" gutterBottom>{data.name}</Typography>
          <Typography fontSize={14} fontWeight={800}>{rp(data.price)}</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Typography fontSize={12} color="text.secondary">Pindahkan ke Wishlist</Typography>
        <Divider orientation="vertical" sx={{ mx: 1, height: 32, ml: { xs: 3, lg: 6 } }} />
        <IconButton color="default">
          <Delete />
        </IconButton>
        <Divider orientation="vertical" sx={{ mx: 1, height: 32, mr: { xs: 3, lg: 6 } }} />
        <RemoveCircleOutline color="disabled" onClick={onReduceCart} sx={{ cursor: 'pointer' }} />
        <Box borderBottom="1px solid #f0f0f0">
          <Typography mx={2} color="text.secondary" fontWeight={600}>{data.qty}</Typography>
        </Box>
        <AddCircleOutline color="primary" onClick={onAddCart} sx={{ cursor: 'pointer' }} />
      </Box>
    </>
  );
}

function Cart() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [openModalState, setOpenModalState] = useState(false);
  const [loadingCart, setLoadingCart] = React.useState(false);
  const globalCart = useSelector(({ cart }) => cart);

  const handleAddCart = () => {
    dispatch(addCount());
  };

  const handleReduceCart = () => {
    dispatch(reduceCount());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchCart = async () => {
    try {
      const cart = await getCart();
      if (cart.status !== 'success') {
        throw new Error(cart.message);
      }
      dispatch(initCart(cart.data));
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  React.useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Container sx={{ my: 4 }}>
      {loadingCart && (
        <Box py={6}>
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      {(globalCart.data.length === 0 && !loadingCart) && (
        <Box px={6} py={4}>
          <Typography color="text.secondary">Keranjangmu Kosong</Typography>
        </Box>
      )}
      {(globalCart.data.length !== 0 && !loadingCart) && (
        <Grid container spacing={{ xs: 5, lg: 8 }}>
          <Grid item xs={12} lg={8}>
            <Typography fontSize={20} fontWeight={800} mb={3}>Keranjang</Typography>
            {globalCart.data.map((row) => (
              <CartItem
                key={row.id_item}
                onAddCart={handleAddCart}
                onReduceCart={handleReduceCart}
                data={row}
              />
            ))}
          </Grid>
          <Grid item xs={12} lg={4} mb={4}>
            <Box border="1px solid #e5e7e9" borderRadius={2} p={2} py={2}>
              <Typography fontWeight={600}>Ringkasan Belanja</Typography>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography fontSize={14} color="text.secondary">
                  Total Harga (
                  {globalCart.data.reduce((partialSum, obj) => partialSum + Number(obj.qty), 0)}
                  {' '}
                  barang)
                </Typography>
                <Typography fontSize={18} fontWeight={800} color="success.main">
                  {rp(totalPrice(globalCart.data))}
                </Typography>
              </Box>
              <Divider />
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, fontWeight: 800, fontSize: 14 }}
                onClick={() => setOpenModalState(true)}
              >
                Beli (
                {globalCart.data.reduce((partialSum, obj) => partialSum + Number(obj.qty), 0)}
                )
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
      {/* <PayModal open={openModalState} onClose={() => setOpenModalState(false)} /> */}
    </Container>
  );
}

export default Cart;
