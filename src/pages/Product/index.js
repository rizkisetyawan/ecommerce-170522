/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {
  Box,
  Container,
  Grid,
  Typography,
  Rating,
  Divider,
  LinearProgress,
  IconButton,
  Button,
  Avatar,
} from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  AddCircle, Favorite, FavoriteBorder, RemoveCircle,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { initCart } from '../../redux/sliceCart';
import { PayModal } from '../../components';
import {
  getDetailProduct, rp, postCart, getCart,
} from '../../utils';

function Product() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [openModalState, setOpenModalState] = useState(false);
  const [productState, setProductState] = useState({
    loading: false,
    data: null,
    message: null,
  });
  const [cartState, setCartState] = useState({
    loading: false,
  });
  const [qtyState, setQtyState] = useState(1);

  const fetchProduct = async () => {
    setProductState({ ...productState, loading: true });
    try {
      const product = await getDetailProduct(id);
      if (product.status !== 'success') {
        throw new Error(product.message);
      }
      setProductState({
        ...productState,
        loading: false,
        data: product.data,
      });
    } catch (err) {
      setProductState({
        ...productState,
        loading: false,
        message: err.message,
      });
    }
  };

  const fetchCart = async () => {
    try {
      const cart = await getCart();
      if (cart.status !== 'success') {
        throw new Error(cart.message);
      }
      dispatch(initCart(cart.data));
    } catch (err) {
      throw err.message;
    }
  };

  const handleAddCart = async () => {
    setCartState({ ...cartState, loading: true });
    try {
      const cart = await postCart({ id_item: productState.data.product.id_item, qty: qtyState });
      if (cart.status !== 'success') {
        throw new Error(cart.message);
      }
      fetchCart();
      setCartState({ ...cartState, loading: false });
    } catch (err) {
      setCartState({ ...cartState, loading: false });
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const handleAddQty = () => {
    setQtyState((prevVal) => (productState.data.product.stock <= prevVal ? prevVal : prevVal + 1));
  };

  const handleRemoveQty = () => {
    setQtyState((prevVal) => (prevVal <= 1 ? prevVal : prevVal - 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
  }, []);

  return (
    <Container>
      {
        productState.loading && (
          <Box py={6} display="flex" justifyContent="center">
            <Typography color="text.secondary">Loading ...</Typography>
          </Box>
        )
      }
      {
        (!productState.loading && productState.message) && (
          <Box py={6} display="flex" justifyContent="center">
            <Typography color="text.secondary">{productState.message}</Typography>
          </Box>
        )
      }
      {
        (!productState.loading && productState.data) && (
          <>
            <Grid container spacing={5}>
              <Grid item xs={12} lg={4}>
                <Box>
                  <img width="100%" src={productState.data.product.foto} alt="gambar produk" style={{ maxHeight: 300, objectFit: 'contain' }} />
                </Box>
              </Grid>
              <Grid item xs={12} lg={5}>
                <Box>
                  <Typography
                    fontSize={18}
                    fontWeight={800}
                    gutterBottom
                  >
                    {productState.data.product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Typography fontSize={14} fontWeight={400} color="text.secondary">
                      Terjual
                      {' '}
                      {productState.data.count.sold || 0}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Favorite sx={{ fontSize: 14, color: 'error.main' }} />
                      <Typography fontSize={14} fontWeight={400} color="text.secondary">1145</Typography>
                    </Box>
                    { productState.data.reviews.length !== 0 && (
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Rating defaultValue={1} max={1} size="small" readOnly />
                        <Typography fontSize={14} fontWeight={400}>{productState.data.reviews.reduce((acc, val) => acc + val.rating, 0) / productState.data.reviews.length}</Typography>
                        <Typography fontSize={14} fontWeight={400} color="text.secondary">
                          (
                          {productState.data.reviews.length}
                          {' '}
                          ulasan)
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography fontSize={28} fontWeight={800} my={2}>{rp(productState.data.product.price)}</Typography>
                    <IconButton>
                      <FavoriteBorder sx={{ fontSize: 28, color: 'default' }} />
                    </IconButton>
                  </Box>
                  <Divider width="100%" sx={{ mb: 1 }} />
                  <Typography color="primary.main" fontWeight={600} gutterBottom>Keterangan</Typography>
                  <Typography fontSize={14} component="pre" whiteSpace="pre-wrap">{productState.data.product.description}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} lg={3}>
                <Box border="1px solid #e5e7e9" borderRadius={2} p={2} py={4}>
                  <Typography fontWeight={600} mb={2}>Atur jumlah</Typography>
                  <Box display="flex" gap={1.5} alignItems="center">
                    <Box borderRadius={0.5} border="1px solid #bfc9d9" display="flex" alignItems="center">
                      <IconButton color={productState.data.product.stock <= qtyState ? 'default' : 'primary'} onClick={handleAddQty}>
                        <AddCircle />
                      </IconButton>
                      <Typography color="text.secondary" mx={0.5} textAlign="center">{qtyState}</Typography>
                      <IconButton color={qtyState <= 1 ? 'default' : 'error'} onClick={handleRemoveQty}>
                        <RemoveCircle />
                      </IconButton>
                    </Box>
                    <Typography fontSize={14}>
                      Stok
                      {' '}
                      <strong>{productState.data.product.stock}</strong>
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2} my={2}>
                    <Typography>Subtotal</Typography>
                    <Typography fontSize={20} fontWeight={800}>{rp(+productState.data.product.price * qtyState)}</Typography>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                          fontSize: 13, whiteSpace: 'nowrap', px: 1, textTransform: 'capitalize', fontWeight: 800,
                        }}
                        onClick={() => setOpenModalState(true)}
                      >
                        Beli Langsung
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          fontSize: 13, whiteSpace: 'nowrap', px: 1, textTransform: 'capitalize', fontWeight: 800,
                        }}
                        onClick={handleAddCart}
                        disabled={cartState.loading}
                      >
                        {cartState.loading ? 'Loading ...' : '+ Keranjang'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              { productState.data.reviews.length !== 0 && (
                <>
                  <Grid item xs={12} lg={5}>
                    <Typography fontWeight={800} gutterBottom>
                      ULASAN (
                      {productState.data.reviews.length}
                      )
                    </Typography>
                    <Typography fontSize={14}>Pintar Facil Smart Paint Roll untuk cat tembok tanpa belepotan</Typography>
                    <Box display="flex" gap={{ xs: 2, sm: 7 }} alignItems="center" my={2} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                      <Box>
                        <Typography fontSize={60} textAlign="center">
                          {productState.data.reviews.reduce((acc, val) => acc + val.rating, 0) / productState.data.reviews.length}
                          <Typography display="inline-block" color="text.secondary" ml={0.5}>/5</Typography>
                        </Typography>
                        <Rating defaultValue={5} readOnly size="large" sx={{ mt: -1 }} />
                        <Typography fontSize={12} color="text.secondary" textAlign="center">
                          (
                          {productState.data.reviews.length}
                          ) Ulasan
                        </Typography>
                      </Box>
                      <Box>
                        {[
                          {
                            rate: 5,
                            count: productState.data.count.rate_five,
                          },
                          {
                            rate: 4,
                            count: productState.data.count.rate_four,
                          },
                          {
                            rate: 3,
                            count: productState.data.count.rate_three,
                          },
                          {
                            rate: 2,
                            count: productState.data.count.rate_two,
                          },
                          {
                            rate: 1,
                            count: productState.data.count.rate_one,
                          },
                        ].map((row) => {
                          const {
                            // eslint-disable-next-line camelcase
                            rate_one, rate_two, rate_three, rate_four, rate_five,
                          } = productState.data.count;
                          const result = Number(rate_one) + Number(rate_two) + Number(rate_three) + Number(rate_four) + Number(rate_five);
                          const formula = (row.count * 100) / result;
                          return (
                            <Box index={row.rate} display="flex" alignItems="center" gap={0.5}>
                              <Rating defaultValue={1} max={1} readOnly size="small" />
                              <Typography fontSize={14} fontWeight={600} color="text.secondary">{row.rate}</Typography>
                              <Box width={100} mx={{ xs: 0, sm: 1 }}>
                                <LinearProgress variant="determinate" value={formula} />
                              </Box>
                              <Typography fontSize={14} color="text.secondary" justifySelf="flex-end">{row.count}</Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6.5}>
                    <Typography fontSize={12} fontWeight={800} color="text.secondary">
                      SEMUA ULASAN (
                      {productState.data.reviews.length}
                      )
                    </Typography>
                    {productState.data.reviews.map((review) => (
                      <Box key={review.name} display="flex" gap={2} my={3}>
                        <Avatar alt={review.name} src={review.foto} />
                        <Box>
                          <Typography fontSize={12} color="primary.main" fontWeight={800}>{review.name || review.email}</Typography>
                          <Typography fontSize={12} color="text.secondary" whiteSpace="nowrap">{moment(review.created_at).fromNow()}</Typography>
                        </Box>
                        <Box>
                          <Rating defaultValue={5} size="small" readOnly />
                          <Typography fontSize={14} component="pre" whiteSpace="pre-wrap">{review.review}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Grid>
                </>
              )}
              { productState.data.reviews.length === 0 && (
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Typography fontWeight={800} color="text.secondary" my={6}>Tidak ada Ulasan</Typography>
                </Grid>
              )}
            </Grid>
            <PayModal
              open={openModalState}
              onClose={() => setOpenModalState(false)}
              data={{
                id_item: productState.data.product.id_item,
                qty: qtyState,
                price: +productState.data.product.price * qtyState,
              }}
            />
          </>
        )
      }
    </Container>
  );
}

export default Product;
