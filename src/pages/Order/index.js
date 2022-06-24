/* eslint-disable react/prop-types */
import {
  Container,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
} from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getTrxToko, rp, colorTrx } from '../../utils';

function ListUser({ user }) {
  return (
    <Box key={user.id_user} mb={{ xs: 4, sm: 2 }} display="flex" justifyContent="space-between" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} flexWrap="wrap">
      <Box>
        <Box display="flex" gap={2} mb={1.2} justifyContent={{ xs: 'space-between', sm: 'flex-start' }} alignItems="center">
          <Box display="flex" gap={1} alignItems="center">
            <Avatar src={user.user_foto} sx={{ width: 20, height: 20 }} />
            <Typography fontSize={12} fontWeight={800} textAlign={{ xs: 'left', sm: 'center', md: 'left' }}>{user.user_name || user.email}</Typography>
          </Box>
          <Box px={1} py={0.2} bgcolor={colorTrx(user.status).bgcolor}>
            <Typography
              fontSize={12}
              fontWeight={800}
              textTransform="capitalize"
              sx={{ color: colorTrx(user.status).color }}
            >
              {user.status}
            </Typography>
          </Box>
        </Box>
        {user.items.map((item) => (
          <Box key={item.item_name} display="flex" gap={2} mb={1.2} justifyContent="space-between">
            <Box display="flex" gap={2}>
              <Avatar src={item.foto} variant="square" alt={item.item_name} sx={{ width: 60, height: 60, borderRadius: 1 }} />
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

          </Box>
        ))}
      </Box>
      <Box display="flex" gap={2}>
        <Divider orientation="vertical" sx={{ height: '80%', display: { xs: 'none', sm: 'block' } }} />
        <Box>
          <Typography fontSize={12} color="text.secondary" fontWeight={400} textAlign="right">Total Belanja</Typography>
          <Typography fontSize={14} fontWeight={800}>
            {rp(user.items.reduce((acc, val) => acc + Number(val.price), 0))}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" width="100%" maxWidth={{ sm: 250 }} alignItems="flex-end">
        <Button fullWidth variant="contained" sx={{ fontWeight: 800, fontSize: 12, mb: 1 }}>Terima</Button>
        <Button fullWidth variant="outlined" color="error" sx={{ fontWeight: 800, fontSize: 12 }}>Tolak</Button>
      </Box>
    </Box>
  );
}

function OrderItem({
  onOpenReview, onOpenDetail, onOpenUpload, data, onChangeStatus,
}) {
  return (
    <Box boxShadow="0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))" p={2}>
      <Box display="flex" justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.25} mb={1.8} flexDirection="row">
        <Box display="flex" gap={1.25} alignItems="center" flexWrap="wrap">
          <ShoppingBag fontSize="small" sx={{ color: 'rgb(3, 172, 14)' }} />
          <Typography fontWeight={800} fontSize={12}>Pembelian</Typography>
          <Typography fontSize={12} color="text.secondary">{moment(data.created_at).format('DD MMM YYYY')}</Typography>
          <Typography fontSize={12} color="text.secondary">{data.id_item_order}</Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={{ xs: 2, md: 4, lg: 8 }}
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
      >
        <Box width="100%">
          {data.user.map((user) => (
            <ListUser
              user={user}
              onOpenReview={onOpenReview}
              onOpenDetail={onOpenDetail}
              onOpenUpload={onOpenUpload}
              data={data}
              onChangeStatus={onChangeStatus}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function Order() {
  const identity = useSelector(({ auth }) => auth);
  const [orderState, setOrderState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchTrxToko = async () => {
    setOrderState({ ...orderState, loading: true });
    try {
      const invoice = await getTrxToko(identity.toko.id_umkm);
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

  useEffect(() => {
    fetchTrxToko();
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
          { orderState.data.length === 0 && (
            <Box py={6} display="flex" justifyContent="center">
              <Typography color="text.secondary">Tidak ada pesanan</Typography>
            </Box>
          )}
          { orderState.data.length !== 0 && (
            <Box display="flex" flexDirection="column" gap={2}>
              {
                orderState.data.map((row) => (
                  <OrderItem key={row.id_item_order} data={row} />
                ))
              }
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default Order;
