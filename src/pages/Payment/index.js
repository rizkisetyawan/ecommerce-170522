import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Grid,
  Button,
} from '@mui/material';
import { ContentCopy, Info } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate, useParams } from 'react-router-dom';
import { getInvoice, rp } from '../../utils';
import { DialogUploadStruk } from '../../components';

function Payment() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { noInvoice } = useParams();
  const [invoiceState, setInvoiceState] = useState({
    loading: false,
    data: null,
    message: null,
  });
  const [dialogUpload, setDialogUpload] = useState({
    open: false,
  });

  // eslint-disable-next-line no-unused-vars
  const handleOpenUpload = () => {
    setDialogUpload({
      open: true,
    });
  };

  const handleCloseUpload = () => {
    setDialogUpload({
      open: false,
    });
  };

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
    <Container maxWidth="sm">
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
      { (!invoiceState.loading && invoiceState.data) && (
        <>
          <Box
            border={0.5}
            borderColor="divider"
            borderRadius={1}
            p={2}
            pb={4}
            mb={2}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography fontSize={20} fontWeight={800}>Transfer Bank</Typography>
              <Avatar src={invoiceState.data.logo} variant="square" sx={{ '& img': { objectFit: 'contain' }, width: 80, height: 80 }} />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography fontSize={14} color="text.secondary">Nomor Rekening</Typography>
                <Typography fontSize={18} fontWeight={800}>{invoiceState.data.no_rek}</Typography>
                <Typography fontSize={14} color="text.secondary">{invoiceState.data.name}</Typography>
              </Box>
              <CopyToClipboard
                text={invoiceState.data.no_rek}
                onCopy={() => enqueueSnackbar('No Rekening di salin', { variant: 'success' })}
              >
                <Box display="flex" gap={0.5} alignItems="center" sx={{ cursor: 'pointer' }}>
                  <Typography fontWeight={800} color="success.light">Salin</Typography>
                  <ContentCopy fontSize="small" sx={(theme) => ({ color: theme.palette.success.light })} />
                </Box>
              </CopyToClipboard>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography fontSize={14} color="text.secondary">Total Pembayaran</Typography>
                <Typography fontSize={18} color="error.main" fontWeight={800}>
                  {rp(invoiceState.data.price)}
                </Typography>
              </Box>
              {/* <Typography fontWeight={800} color="success.light">Lihat Detail</Typography> */}
            </Box>
            <Box
              p={2}
              border={1}
              borderColor="#70eafa"
              borderRadius={1}
              bgcolor="#ebfffe"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Info sx={{ color: 'rgb(40, 185, 225)' }} />
              <Box>
                <Typography fontWeight={800}>Penting!</Typography>
                <Typography fontSize={14} color="text.secondary">Tidak disarankan transfer melalui LLG/Kliring/SKBNI</Typography>
              </Box>
            </Box>
          </Box>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/purchase')}
                sx={{ fontWeight: 800, fontSize: 14 }}
              >
                Cek Status Pembayaran
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate('/')}
                sx={{ fontWeight: 800, fontSize: 14 }}
              >
                Belanja Lagi
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                color="warning"
                onClick={handleOpenUpload}
                sx={{ fontWeight: 800, fontSize: 14 }}
              >
                Upload bukti pembayaran
              </Button>
            </Grid>
          </Grid>
          <DialogUploadStruk
            open={dialogUpload.open}
            onClose={handleCloseUpload}
            onSuccess={() => navigate('/purchase')}
            data={{
              id_item_order: invoiceState.data.detail[0].id_item_order,
              foto_trx: invoiceState.data.detail[0].toko[0].foto_trx,
            }}
          />
        </>
      )}
    </Container>
  );
}

export default Payment;
