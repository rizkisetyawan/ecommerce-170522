/* eslint-disable react/prop-types */
import {
  Typography,
  Box,
  Grid,
  Button,
} from '@mui/material';
import { Print } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { updateIdentity } from '../../redux/sliceAuth';
import {
  rp, getInvoice, getIdentity,
} from '../../utils';

const countPriceBarang = (data) => {
  let count = 0;
  let totalPrice = 0;

  data.forEach((row) => {
    row.items.forEach((item) => {
      count += Number(item.qty);
      totalPrice += Number(item.price);
    });
  });

  return {
    count,
    totalPrice: rp(totalPrice),
  };
};

function Invoice() {
  const dispatch = useDispatch();
  const identity = useSelector(({ auth }) => auth);
  const { noInvoice } = useParams();
  const [invoiceState, setInvoiceState] = useState({
    loading: false,
    data: null,
    message: null,
  });
  const fetchInvoice = async () => {
    setInvoiceState({ ...invoiceState, loading: true });
    try {
      const invoice = await getInvoice(noInvoice);
      if (invoice.status !== 'success') {
        throw new Error(invoice.message);
      }
      setInvoiceState({
        ...invoiceState,
        loading: false,
        data: invoice.data,
      });
      const detailUser = await getIdentity();
      dispatch(updateIdentity(detailUser.data));
    } catch (err) {
      setInvoiceState({
        ...invoiceState,
        loading: false,
        message: err.message,
      });
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  return (
    <Box>
      { invoiceState.loading && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { (!invoiceState.loading && invoiceState.message) && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">{invoiceState.message}</Typography>
        </Box>
      )}
      <Box px={2} width={800} margin="0 auto">
        { (!invoiceState.loading && invoiceState.data) && (
          <Box>
            <Button
              id="btn_print"
              variant="contained"
              color="success"
              startIcon={<Print />}
              size="small"
              onClick={() => window.print()}
              sx={{
                my: 2,
                fontSize: 10,
              }}
            >
              Cetak
            </Button>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight={800} fontSize={30} sx={{ color: 'success.main' }}>
                Mui-Commerce
              </Typography>
              <Box>
                <Typography textAlign="right" fontWeight={800} letterSpacing="2px">INVOICE</Typography>
                <Typography textAlign="right" fontSize={12} fontWeight={800} sx={{ color: 'success.main' }}>{invoiceState.data.id_item_order}</Typography>
              </Box>
            </Box>

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              mt={3}
              sx={{
                '-webkit-print-color-adjust': 'exact',
                backgroundImage: 'url("/lunas.png")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <Grid item xs={6}>
                <Box>
                  <Typography fontWeight={800} fontSize={12} gutterBottom>
                    DITERBITKAN ATAS NAMA
                  </Typography>
                  <Box display="flex" gap={2}>
                    <Typography fontSize={12}>Penjual</Typography>
                    <Typography fontSize={12} fontWeight={800}>
                      :
                      {' '}
                      {invoiceState.data.detail[0].toko.map((row) => row.toko_name).join(', ')}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={5} mb={3}>
                <Box>
                  <Typography fontWeight={800} fontSize={12} gutterBottom>
                    UNTUK
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={4}><Typography fontSize={12}>Pembeli</Typography></Grid>
                    <Grid item xs={8}>
                      <Typography fontSize={12} fontWeight={800}>
                        :
                        {' '}
                        {identity.user?.name || identity.user?.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}><Typography fontSize={12}>No Handphone</Typography></Grid>
                    <Grid item xs={8}>
                      <Typography fontSize={12} fontWeight={800}>
                        :
                        {' '}
                        {identity.user?.hp || '-'}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography fontSize={12}>Tanggal Pembelian</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize={12} fontWeight={800}>
                        :
                        {' '}
                        {moment(invoiceState.data.detail[0].created_at).format('DD MMMM YYYY')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box borderTop={2} borderBottom={2} color="#313538" px={2} py="18px" display="flex" justifyContent="space-between">
                  <Box flex={1}>
                    <Typography fontSize={12} fontWeight={800}>INFO PRODUK</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" gap={4}>
                    <Typography fontSize={12} fontWeight={800} width={58} textAlign="right">JUMLAH</Typography>
                    <Typography fontSize={12} fontWeight={800} width={145} textAlign="right">HARGA SATUAN</Typography>
                    <Typography fontSize={12} fontWeight={800} width={145} textAlign="right">TOTAL HARGA</Typography>
                  </Box>
                </Box>
              </Grid>
              { invoiceState.data.detail[0].toko.map((row) => (
                <React.Fragment key={row.id_item_order}>
                  {row.items.map((row2) => (
                    <Grid item key={row2.id_item} xs={12}>
                      <Box borderBottom={1} borderColor="#f0f0f0" px={2} py="18px" display="flex" justifyContent="space-between">
                        <Box flex={1}>
                          <Typography fontSize={14} color="success.main" fontWeight={800}>
                            {row2.item_name}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" gap={4}>
                          <Typography fontSize={12} width={58} textAlign="right">{row2.qty}</Typography>
                          <Typography fontSize={12} width={145} textAlign="right">{rp(+row2.price / +row2.qty)}</Typography>
                          <Typography fontSize={12} width={145} textAlign="right">{rp(row2.price)}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </React.Fragment>
              ))}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" mt={2} px={2} borderBottom={1} borderColor="#f0f0f0">
                  <Box width={340} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography fontSize={12} fontWeight={800}>
                      TOTAL HARGA (
                      {countPriceBarang(invoiceState.data.detail[0].toko).count}
                      {' '}
                      BARANG)
                    </Typography>
                    <Typography fontSize={14} fontWeight={800}>
                      {countPriceBarang(invoiceState.data.detail[0].toko).totalPrice}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize={12}>
                    * Invoice ini sah dan diproses oleh komputer
                  </Typography>
                  <Box mr={2} width={340}>
                    <Typography fontSize={12} mt={1}>Metode Pembayaran :</Typography>
                    <Typography fontSize={12} fontWeight={800}>
                      Transfer Bank
                      {' '}
                      {invoiceState.data.bank_name.toUpperCase()}
                      {' '}
                      Manual
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Invoice;
