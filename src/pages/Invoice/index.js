/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Typography,
  Box,
  Avatar,
  Divider,
  Grid,
  Button,
  Container,
} from '@mui/material';
import { ArrowForwardIos, Print } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import {
  rp, colorTrx, getInvoice,
} from '../../utils';

function Invoice() {
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
                    <Typography fontSize={12} fontWeight={800}>: Knowledge Zenith Store</Typography>
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
                      <Typography fontSize={12} fontWeight={800}>: Rizki Setyawan</Typography>
                    </Grid>
                    <Grid item xs={4}><Typography fontSize={12}>No Handphone</Typography></Grid>
                    <Grid item xs={8}>
                      <Typography fontSize={12} fontWeight={800}>: 081212071870</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography fontSize={12}>Tanggal Pembelian</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize={12} fontWeight={800}>: 07 Juli 2022</Typography>
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
              <Grid item xs={12}>
                <Box borderBottom={1} borderColor="#f0f0f0" px={2} py="18px" display="flex" justifyContent="space-between">
                  <Box flex={1}>
                    <Typography fontSize={14} color="success.main" fontWeight={800}>
                      CCA CRA+ HiFi In Ear Earphone with MIC - Gold
                    </Typography>
                    <Typography fontSize={12}>Berat: 200 gr</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" gap={4}>
                    <Typography fontSize={12} width={58} textAlign="right">1</Typography>
                    <Typography fontSize={12} width={145} textAlign="right">Rp249.000</Typography>
                    <Typography fontSize={12} width={145} textAlign="right">Rp249.000</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" mt={2} px={2} borderBottom={1} borderColor="#f0f0f0">
                  <Box width={340} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography fontSize={12} fontWeight={800}>TOTAL HARGA (1 BARANG)</Typography>
                    <Typography fontSize={14} fontWeight={800}>Rp500.000</Typography>
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
                      Transfer Bank BNI Manual
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
