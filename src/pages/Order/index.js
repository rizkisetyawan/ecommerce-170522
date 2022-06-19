/* eslint-disable react/prop-types */
import {
  Container,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
  Dialog,
  Rating,
  TextField,
  Grid,
} from '@mui/material';
import { ShoppingBag, ArrowForwardIos } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getTrx, rp } from '../../utils';

function ReviewDialog({ open, onClose }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <Box px={3} pb={2} pt={3}>
        <Box display="flex" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.25} mb={1.8} flexDirection={{ xs: 'column', md: 'row' }}>
          <Box display="flex" gap={1.25} alignItems="center">
            <ShoppingBag fontSize="small" sx={{ color: 'rgb(3, 172, 14)' }} />
            <Typography fontWeight={800} fontSize={12}>Belanja</Typography>
            <Typography fontSize={12} color="text.secondary">22 Apr 2022</Typography>
          </Box>
        </Box>
        <Typography fontSize={12} fontWeight={800} mb={1.25} textAlign={{ xs: 'left', sm: 'center', md: 'left' }}>Pakaian Anak Grosir Bekasi</Typography>
        <Box display="flex" gap={2} flexDirection={{ xs: 'column' }}>
          <Box display="flex" gap={2} alignItems="center">
            <Avatar src="https://source.unsplash.com/random" variant="square" alt="baju muslim" sx={{ width: 60, height: 60 }} />
            <Box>
              <Typography fontSize={14} fontWeight={800} gutterBottom>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
              <Rating value={4.5} precision={0.5} />
            </Box>
          </Box>
          <Box>
            <Typography fontSize={14} fontWeight={800} gutterBottom>Ulasan :</Typography>
            <TextField
              fullWidth
              disabled
              rows={4}
              multiline
              sx={
                {
                  '& textarea': {
                    fontSize: 14,
                  },
                }
              }
              value="Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, deleniti laborum neque sint quaerat consequuntur
              excepturi voluptate porro placeat aliquam quam nulla omnis
              tempore tempora adipisci officiis. Temporibus, officia doloribus!"
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button sx={{ fontSize: 12, fontWeight: 800 }} onClick={onClose}>Cancel</Button>
          <Button variant="contained" sx={{ fontSize: 12, fontWeight: 800 }}>Submit</Button>
        </Box>
      </Box>
    </Dialog>
  );
}

const totalPrice = (data) => {
  let result = 0;
  data.toko.forEach((row) => {
    row.items.forEach((row2) => {
      result += row2.price;
    });
  });
  return result;
};

function OrderDetailDialog({ open, onClose, data }) {
  return (
    <Dialog onClose={onClose} open={open}>
      { !data && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { data && (
        <Box p={3}>
          <Typography fontWeight={800} mb={2}>Detail Transaksi</Typography>
          <Grid container justifyContent="space-between" spacing={1}>
            <Grid item xs={4}>
              <Typography fontSize={12} color="text.secondary">Status</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography px={1} py={0.2} bgcolor="rgb(214, 255, 222)" fontSize={12} fontWeight={800} display="inline-block" sx={{ color: 'rgb(3, 172, 14)' }}>{data.status}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography fontSize={12} color="text.secondary">No. Invoice</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontSize={12} color="primary" fontWeight={800}>
                :
                {' '}
                {data.id_item_order}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography fontSize={12} color="text.secondary">Tanggal Pembelian</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontSize={12} color="text.secondary" fontWeight={800}>
                :
                {' '}
                {moment(data.created_at).format('DD MMM YYYY, HH:mm')}
                {' '}
                WIB
              </Typography>
            </Grid>
            <Grid item xs={12} my={2}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight={800} fontSize={14}>Detail Produk</Typography>
            </Grid>
            {data.toko.map((toko) => (
              <React.Fragment key={toko.toko_name}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end',
                  }}
                >
                  <Typography fontWeight={800} fontSize={12}>{toko.toko_name}</Typography>
                  <ArrowForwardIos sx={{ fontSize: 10 }} />
                </Grid>
                { toko.items.map((item) => (
                  <Grid item xs={12}>
                    <Box border={1} borderColor="divider" p={1} mb={1.2}>
                      <Box display="flex" gap={1.2} alignItems="center" mb={1}>
                        <Avatar src={item.foto} variant="square" alt="detail-product" sx={{ width: 46, height: 46 }} />
                        <Box>
                          <Typography fontSize={12} fontWeight={800} gutterBottom>
                            {item.item_name}
                          </Typography>
                          <Typography fontSize={12} color="text.secondary" fontWeight={400}>
                            {item.qty}
                            {' '}
                            x
                            {' '}
                            {rp(item.price / item.qty)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection={{ xs: 'column', sm: 'row' }}
                      alignItems={{ xs: 'flex-end', sm: 'center' }}
                      gap={{ xs: 0.5, sm: 2 }}
                      justifyContent="flex-end"
                    >
                      <Typography fontSize={14}>Total Harga</Typography>
                      <Typography fontSize={14} fontWeight={800}>{rp(totalPrice(data))}</Typography>
                    </Box>
                  </Grid>
                ))}
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      )}
    </Dialog>
  );
}

function OrderItem({ onOpenReview, onOpenDetail, data }) {
  return (
    <Box boxShadow="0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))" p={2}>
      <Box display="flex" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.25} mb={1.8} flexDirection={{ xs: 'column', md: 'row' }}>
        <Box display="flex" gap={1.25} alignItems="center" flexWrap="wrap">
          <ShoppingBag fontSize="small" sx={{ color: 'rgb(3, 172, 14)' }} />
          <Typography fontWeight={800} fontSize={12}>Belanja</Typography>
          <Typography fontSize={12} color="text.secondary">{moment(data.created_at).format('DD MMM YYYY')}</Typography>
          <Box px={1} py={0.2} bgcolor="rgb(214, 255, 222)">
            <Typography
              fontSize={12}
              fontWeight={800}
              textTransform="capitalize"
              sx={{ color: 'rgb(3, 172, 14)' }}
            >
              {data.status}
            </Typography>
          </Box>
        </Box>
        <Typography fontSize={12} color="text.secondary">{data.id_item_order}</Typography>
      </Box>
      <Box
        display="flex"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={{ xs: 2, md: 4, lg: 8 }}
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
      >
        {data.toko.map((toko) => (
          <Box key={toko.toko_name} mb={2}>
            <Typography fontSize={12} fontWeight={800} mb={1.25} textAlign={{ xs: 'left', sm: 'center', md: 'left' }}>{toko.toko_name}</Typography>
            {toko.items.map((item) => (
              <Box display="flex" gap={2}>
                <Box display="flex" gap={2}>
                  <Avatar src={item.foto} variant="square" alt={item.item_name} sx={{ width: 60, height: 60 }} />
                  <Box>
                    <Typography fontSize={14} fontWeight={800}>
                      {item.item_name}
                    </Typography>
                    <Typography fontSize={12} color="text.secondary" fontWeight={400}>
                      {item.qty}
                      {' '}
                      barang x
                      {' '}
                      {rp(item.price / item.qty)}
                    </Typography>
                  </Box>
                </Box>
                <Divider orientation="vertical" sx={{ height: 50, display: { xs: 'none', md: 'block' } }} />
                <Box>
                  <Typography fontSize={12} color="text.secondary" fontWeight={400}>Total Belanja</Typography>
                  <Typography fontSize={14} fontWeight={800}>
                    {rp(item.price)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
        <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} width="100%" maxWidth={{ sm: 250 }} gap={{ xs: 1, lg: 2 }}>
          {data.status === 'selesai' && <Button fullWidth variant="contained" onClick={onOpenReview} sx={{ fontWeight: 800, fontSize: 12 }}>Beri Ulasan</Button>}
          <Button fullWidth variant="outlined" onClick={() => onOpenDetail(data)} sx={{ fontWeight: 800, fontSize: 12 }}>Detail</Button>
        </Box>
      </Box>
    </Box>
  );
}

function Order() {
  const [dialogReview, setDialogReview] = React.useState(false);
  const [dialogDetail, setDialogDetail] = React.useState({
    open: false,
    data: null,
  });
  const [orderState, setOrderState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchTrx = async () => {
    setOrderState({ ...orderState, loading: true });
    try {
      const invoice = await getTrx();
      if (invoice.status !== 'success') {
        throw new Error(invoice.message);
      }
      setOrderState({
        ...orderState,
        loading: false,
        data: invoice.data,
      });
    } catch (err) {
      setOrderState({
        ...orderState,
        loading: false,
        message: err.message,
      });
    }
  };

  const handleOpenReview = () => {
    setDialogReview(true);
  };

  const handleCloseReview = () => {
    setDialogReview(false);
  };

  const handleOpenDetail = (data) => {
    setDialogDetail({
      open: true,
      data,
    });
  };

  const handleCloseDetail = () => {
    setDialogDetail({
      open: false,
      data: null,
    });
  };

  useEffect(() => {
    fetchTrx();
  }, []);

  return (
    <Container>
      { orderState.loading && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { (!orderState.loading && orderState.message) && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">{orderState.message}</Typography>
        </Box>
      )}
      { (!orderState.loading && orderState.data) && (
        <>
          <Box display="flex" flexDirection="column" gap={2}>
            {
              orderState.data.map((row) => (
                <OrderItem
                  key={row.id_item_order}
                  data={row}
                  onOpenReview={handleOpenReview}
                  onOpenDetail={handleOpenDetail}
                />
              ))
            }
          </Box>
          <ReviewDialog open={dialogReview} onClose={handleCloseReview} />
          <OrderDetailDialog
            open={dialogDetail.open}
            onClose={handleCloseDetail}
            data={dialogDetail.data}
          />
        </>
      )}
    </Container>
  );
}

export default Order;
