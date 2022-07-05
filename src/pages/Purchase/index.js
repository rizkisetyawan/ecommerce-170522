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
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Chip,
} from '@mui/material';
import {
  ShoppingBag, ArrowForwardIos, Edit, MoreHoriz,
} from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  getTrx, rp, colorTrx, putReview, putTrxStatus,
} from '../../utils';
import { DialogUploadStruk } from '../../components';

function InputReview({ item, onSuccess }) {
  const { enqueueSnackbar } = useSnackbar();
  const [editState, setEditState] = useState(false);
  const [formState, setFormState] = useState({
    review: item.review,
    rating: item.rating,
  });
  const [loadingState, setLoadingState] = useState(false);

  const handleSubmit = async () => {
    setLoadingState(true);
    try {
      if (!formState.rating) {
        throw new Error('Rating tidak boleh kosong');
      }
      const dataReview = {
        id_item: item.id_item,
        review: formState.review,
        rating: formState.rating,
      };
      const review = await putReview(item.id_item_order, dataReview);
      setLoadingState(false);
      if (review.status !== 'success') {
        throw new Error(review.message);
      }
      onSuccess();
      setEditState(false);
    } catch (err) {
      setLoadingState(false);
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Box display="flex" gap={1} flexDirection={{ xs: 'column' }} mb={2}>
      <Box display="flex" gap={2}>
        <Avatar
          src={item.foto}
          variant="square"
          alt={item.item_name}
          sx={{
            width: 60, height: 60, borderRadius: 1, mt: { xs: 1, sm: 0 },
          }}
        />
        <Box>
          <Typography fontSize={14} fontWeight={800} gutterBottom>
            {item.item_name}
          </Typography>
          <Rating
            readOnly={!editState}
            value={formState.rating}
            onChange={(e, newValue) => setFormState({ ...formState, rating: newValue })}
          />
        </Box>
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize={14} fontWeight={800} gutterBottom>Ulasan :</Typography>
          { (!editState) && (
            <Button
              sx={{ fontSize: 12, fontWeight: 800 }}
              size="small"
              onClick={() => setEditState(true)}
              endIcon={<Edit />}
            >
              Tulis Ulasan
            </Button>
          )}
        </Box>
        { !editState && (
          <Typography fontSize={14} component="pre" whiteSpace="pre-wrap" color="text.secondary">
            {formState.review}
          </Typography>
        )}
        { editState && (
          <TextField
            fullWidth
            rows={2}
            multiline
            value={formState.review}
            onChange={(e) => setFormState({ ...formState, review: e.target.value })}
            sx={
              {
                '& textarea': {
                  fontSize: 14,
                },
              }
            }
          />
        )}
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={0.5} mb={1}>
        { (editState) && (
          <Button
            sx={{ fontSize: 12, fontWeight: 800 }}
            variant="contained"
            size="small"
            disabled={loadingState}
            onClick={handleSubmit}
          >
            {loadingState ? 'Loading ...' : 'Beri Ulasan'}
          </Button>
        )}
      </Box>
    </Box>
  );
}

function ReviewDialog({
  open, onClose, data, onSuccess,
}) {
  return (
    <Dialog onClose={onClose} open={open}>
      { !data && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { data && (
        <Box px={3} pb={2} pt={3}>
          <Box display="flex" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.25} mb={1.8} flexDirection={{ xs: 'column', md: 'row' }}>
            <Box display="flex" gap={1.25} alignItems="center">
              <ShoppingBag fontSize="small" sx={{ color: 'rgb(3, 172, 14)' }} />
              <Typography fontWeight={800} fontSize={12}>Belanja</Typography>
              <Typography fontSize={12} color="text.secondary">{moment(data.created_at).format('DD MMM YYYY')}</Typography>
            </Box>
          </Box>

          <Typography fontSize={12} fontWeight={800} mb={1.25} textAlign={{ xs: 'left', sm: 'center', md: 'left' }}>{data.toko_name}</Typography>
          { data.items.map((item) => (
            <InputReview
              key={item.item_name}
              onSuccess={onSuccess}
              item={{
                ...item,
                id_item_order: data.id_item_order,
              }}
            />
          ))}

        </Box>
      )}
    </Dialog>
  );
}

function PurchaseDetailDialog({ open, onClose, data }) {
  const navigate = useNavigate();
  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open}>
      { !data && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { data && (
        <>
          <Box p={3}>
            <Typography fontWeight={800} mb={2}>Detail Transaksi</Typography>
            <Grid container justifyContent="space-between" spacing={1}>
              <Grid item xs={4}>
                <Typography fontSize={12} color="text.secondary">Status</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography px={1} py={0.2} bgcolor={colorTrx(data.status).bgcolor} fontSize={12} fontWeight={800} display="inline-block" sx={{ color: colorTrx(data.status).color }}>{data.status}</Typography>
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

              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end',
                }}
              >
                <Typography fontWeight={800} fontSize={12}>{data.toko_name}</Typography>
                <ArrowForwardIos sx={{ fontSize: 10 }} />
              </Grid>
              <Grid item xs={12}>
                <Box border={1} borderColor="divider" p={1} mb={0}>
                  { data.items.map((item, i) => (
                    <Box key={item.item_name} display="flex" gap={1.2} alignItems="center" mb={data.items.length - 1 !== i ? 1 : 0}>
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
                  ))}
                </Box>
              </Grid>

            </Grid>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'flex-end', sm: 'center' }}
              gap={{ xs: 0.5, sm: 2 }}
              mt={2}
              justifyContent="flex-end"
            >
              <Typography fontSize={14}>Total Harga</Typography>
              <Typography fontSize={14} fontWeight={800}>
                {rp(data.items.reduce((acc, val) => acc + Number(val.price), 0))}
              </Typography>
            </Box>
          </Box>
          { data.status !== 'selesai' && (
            <Button
              sx={{
                mx: 2, mb: 2, fontSize: 12, textTransform: 'capitalize', fontWeight: 800,
              }}
              onClick={() => navigate(`/payment/${data.id_item_order}`)}
              variant="contained"
            >
              cara pembayaran
            </Button>
          )}
        </>
      )}
    </Dialog>
  );
}

function ListToko({
  onOpenReview, onOpenDetail, onOpenUpload, data, onChangeStatus, toko,
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Box key={toko.toko_name} mb={{ xs: 4, sm: 2 }} display="flex" justifyContent="space-between" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} flexWrap="wrap">
      <Box maxWidth={500}>
        <Box display="flex" gap={2} mb={1} justifyContent={{ xs: 'space-between', sm: 'flex-start' }}>
          <Typography fontSize={12} fontWeight={800} textAlign={{ xs: 'left', sm: 'center', md: 'left' }}>{toko.toko_name}</Typography>
          <Box px={1} py={0.2} bgcolor={colorTrx(toko.status).bgcolor}>
            <Typography
              fontSize={12}
              fontWeight={800}
              textTransform="capitalize"
              sx={{ color: colorTrx(toko.status).color }}
            >
              {toko.status}
            </Typography>
          </Box>
        </Box>
        {toko.items.map((item) => (
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
            {rp(toko.items.reduce((acc, val) => acc + Number(val.price), 0))}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" width="100%" maxWidth={{ sm: 250 }} alignItems="flex-end" mt={-4}>
        <IconButton
          disabled={toko.status !== 'belum dibayar'}
          onClick={handleClick}
        >
          <MoreHoriz />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {
                handleClose();
                navigate(`/payment/${data.id_item_order}`);
              }}
              >
                <ListItemText primary="Cara Pembayaran" sx={{ '& span': { fontSize: 14 } }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {
                handleClose();
                onOpenUpload({
                  ...toko,
                  id_item_order: data.id_item_order,
                });
              }}
              >
                <ListItemText primary="Upload bukti pembayaran" sx={{ '& span': { fontSize: 14 } }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {
                handleClose();
                onChangeStatus(
                  data.id_item_order,
                  'dibatalkan',
                  toko.id_umkm,
                );
              }}
              >
                <ListItemText primary="Batalkan" sx={{ '& span': { fontSize: 14 } }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Popover>
        {toko.status === 'selesai' && <Button fullWidth variant="contained" onClick={() => onOpenReview({ ...toko, created_at: data.created_at, id_item_order: data.id_item_order })} sx={{ fontWeight: 800, fontSize: 12, mb: 1 }}>Beri Ulasan</Button>}
        {toko.status === 'dikirim' && <Button fullWidth variant="contained" onClick={() => onChangeStatus(data.id_item_order, 'selesai', toko.id_umkm)} sx={{ fontWeight: 800, fontSize: 12, mb: 1 }}>Selesai</Button>}
        <Button fullWidth variant="outlined" onClick={() => onOpenDetail({ ...toko, id_item_order: data.id_item_order })} sx={{ fontWeight: 800, fontSize: 12 }}>Detail</Button>
      </Box>
    </Box>
  );
}

function PurchaseItem({
  onOpenReview, onOpenDetail, onOpenUpload, data, onChangeStatus,
}) {
  return (
    <Box boxShadow="0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))" p={2}>
      <Box display="flex" justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.25} mb={1.8} flexDirection="row">
        <Box display="flex" gap={1.25} alignItems="center" flexWrap="wrap">
          <ShoppingBag fontSize="small" sx={{ color: 'rgb(3, 172, 14)' }} />
          <Typography fontWeight={800} fontSize={12}>Belanja</Typography>
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
          {data.toko.map((toko) => (
            <ListToko
              toko={toko}
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

function Purchase() {
  const { enqueueSnackbar } = useSnackbar();
  const [dialogReview, setDialogReview] = useState({
    open: false,
    data: null,
  });
  const [dialogDetail, setDialogDetail] = useState({
    open: false,
    data: null,
  });
  const [dialogUpload, setDialogUpload] = useState({
    open: false,
    data: null,
  });
  const [purchaseState, setPurchaseState] = useState({
    loading: false,
    data: null,
    message: null,
  });
  const [chipState, setChipState] = useState('semua');
  const [chipDataState, setChipDataState] = useState([]);

  const fetchTrx = async () => {
    setPurchaseState({ ...purchaseState, loading: true });
    try {
      const invoice = await getTrx();
      if (invoice.status !== 'success') {
        throw new Error(invoice.message);
      }
      setPurchaseState({
        ...purchaseState,
        loading: false,
        data: invoice.data,
      });
      setChipDataState(invoice.data);
    } catch (err) {
      setPurchaseState({
        ...purchaseState,
        loading: false,
        message: err.message,
      });
    }
  };

  const fetchTrxWithoutLoading = async () => {
    try {
      const invoice = await getTrx();
      if (invoice.status !== 'success') {
        throw new Error(invoice.message);
      }
      setPurchaseState({
        ...purchaseState,
        data: invoice.data,
      });
      setChipDataState(invoice.data);
    } catch (err) {
      setPurchaseState({
        ...purchaseState,
        message: err.message,
      });
    }
  };

  const handleOpenReview = (data) => {
    setDialogReview({
      open: true,
      data,
    });
  };

  const handleCloseReview = () => {
    setDialogReview({
      open: false,
      data: null,
    });
  };

  const handleOpenUpload = (data) => {
    setDialogUpload({
      open: true,
      data,
    });
  };

  const handleCloseUpload = () => {
    setDialogUpload({
      open: false,
      data: null,
    });
  };

  const handleUploadSuccess = () => {
    fetchTrxWithoutLoading();
  };

  const handleReviewSuccess = () => {
    fetchTrxWithoutLoading();
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

  const handleStatusTrx = async (idItemPurchase, status, idUmkm) => {
    try {
      const trx = await putTrxStatus(idItemPurchase, { status, idUmkm });
      if (trx.status !== 'success') {
        throw new Error(trx.message);
      }
      fetchTrxWithoutLoading();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchTrx();
  }, []);

  return (
    <Container>
      { purchaseState.loading && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { (!purchaseState.loading && purchaseState.message) && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">{purchaseState.message}</Typography>
        </Box>
      )}
      { (!purchaseState.loading && purchaseState.data) && (
        <>
          <Box mb={2}>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {[{
                status: 'semua',
              },
              {
                status: 'belum dibayar',
              },
              {
                status: 'diproses',
              },
              {
                status: 'dikirim',
              },
              {
                status: 'selesai',
              },
              {
                status: 'dibatalkan',
              },
              {
                status: 'ditolak',
              },
              ].map((row) => (
                <Chip
                  label={row.status}
                  variant={row.status === chipState ? 'contained' : 'outlined'}
                  color={row.status === chipState ? 'primary' : 'default'}
                  onClick={() => {
                    setChipState(row.status);
                    if (row.status === 'semua') {
                      setChipDataState(purchaseState.data);
                    } else {
                      const newData = purchaseState.data.map((rowPs) => ({
                        ...rowPs,
                        toko: rowPs.toko.filter((rowToko) => rowToko.status === row.status),
                      })).filter((rowToko2) => rowToko2.toko.length !== 0);
                      setChipDataState(newData);
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            {
              chipDataState.map((row) => (
                <PurchaseItem
                  key={row.id_item_order}
                  data={row}
                  onOpenReview={handleOpenReview}
                  onOpenDetail={handleOpenDetail}
                  onOpenUpload={handleOpenUpload}
                  onChangeStatus={handleStatusTrx}
                />
              ))
            }
          </Box>
          <ReviewDialog
            open={dialogReview.open}
            onClose={handleCloseReview}
            onSuccess={handleReviewSuccess}
            data={dialogReview.data}
          />
          <PurchaseDetailDialog
            open={dialogDetail.open}
            onClose={handleCloseDetail}
            data={dialogDetail.data}
          />
          <DialogUploadStruk
            open={dialogUpload.open}
            onClose={handleCloseUpload}
            onSuccess={handleUploadSuccess}
            data={dialogUpload.data}
          />
        </>
      )}
    </Container>
  );
}

export default Purchase;
