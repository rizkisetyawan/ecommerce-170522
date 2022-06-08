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
import React from 'react';

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

function OrderDetailDialog({ open, onClose }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <Box p={3}>
        <Typography fontWeight={800} mb={2}>Detail Transaksi</Typography>
        <Grid container justifyContent="space-between" spacing={1}>
          <Grid item xs={4}>
            <Typography fontSize={12} color="text.secondary">Status</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography px={1} py={0.2} bgcolor="rgb(214, 255, 222)" fontSize={12} fontWeight={800} display="inline-block" sx={{ color: 'rgb(3, 172, 14)' }}>Selesai</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontSize={12} color="text.secondary">No. Invoice</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography fontSize={12} color="primary" fontWeight={800}>: INV/20220415/MPL/2234203270</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontSize={12} color="text.secondary">Tanggal Pembelian</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography fontSize={12} color="text.secondary" fontWeight={800}>: 15 April 2022, 15:32 WIB</Typography>
          </Grid>
          <Grid item xs={12} my={2}>
            <Divider />
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight={800} fontSize={14}>Detail Produk</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end',
            }}
          >
            <Typography fontWeight={800} fontSize={12}>Madame Gie Official</Typography>
            <ArrowForwardIos sx={{ fontSize: 10 }} />
          </Grid>
          <Grid item xs={12}>
            <Box border={1} borderColor="divider" p={1} mb={1.2}>
              <Box display="flex" gap={1.2} alignItems="center" mb={1}>
                <Avatar src="https://source.unsplash.com/random" variant="square" alt="detail-product" sx={{ width: 46, height: 46 }} />
                <Box>
                  <Typography fontSize={12} fontWeight={800} gutterBottom>
                    Madame Gie Gorgeus Wink Celebs Mascara Eyeliner 2 in 1
                  </Typography>
                  <Typography fontSize={12} color="text.secondary" fontWeight={400}>1 x Rp26.000</Typography>
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
              <Typography fontSize={14} fontWeight={800}>Rp26.000</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

function OrderItem({ onOpenReview, onOpenDetail }) {
  return (
    <Box boxShadow="0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))" p={2}>
      <Box display="flex" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.25} mb={1.8} flexDirection={{ xs: 'column', md: 'row' }}>
        <Box display="flex" gap={1.25} alignItems="center">
          <ShoppingBag fontSize="small" sx={{ color: 'rgb(3, 172, 14)' }} />
          <Typography fontWeight={800} fontSize={12}>Belanja</Typography>
          <Typography fontSize={12} color="text.secondary">22 Apr 2022</Typography>
          <Box px={1} py={0.2} bgcolor="rgb(214, 255, 222)">
            <Typography fontSize={12} fontWeight={800} sx={{ color: 'rgb(3, 172, 14)' }}>Selesai</Typography>
          </Box>
        </Box>
        <Typography fontSize={12} color="text.secondary">INV/20220415/MPL/2234203270</Typography>
      </Box>
      <Typography fontSize={12} fontWeight={800} mb={1.25} textAlign={{ xs: 'left', sm: 'center', md: 'left' }}>Pakaian Anak Grosir Bekasi</Typography>
      <Box display="flex" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={{ xs: 2, md: 4, lg: 8 }} flexDirection={{ xs: 'column', md: 'row' }}>
        <Box display="flex" gap={2}>
          <Avatar src="https://source.unsplash.com/random" variant="square" alt="baju muslim" sx={{ width: 60, height: 60 }} />
          <Box>
            <Typography fontSize={14} fontWeight={800}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
            <Typography fontSize={12} color="text.secondary" fontWeight={400}>1 barang x Rp20.230</Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" sx={{ height: 50, display: { xs: 'none', md: 'block' } }} />
        <Box>
          <Typography fontSize={12} color="text.secondary" fontWeight={400}>Total Belanja</Typography>
          <Typography fontSize={14} fontWeight={800}>
            Rp 100.300
          </Typography>
        </Box>
        <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} width="100%" maxWidth={350} gap={{ xs: 1, md: 2 }}>
          <Button fullWidth variant="contained" onClick={onOpenReview} sx={{ fontWeight: 800, fontSize: 12 }}>Beri Ulasan</Button>
          <Button fullWidth variant="outlined" onClick={onOpenDetail} sx={{ fontWeight: 800, fontSize: 12 }}>Detail</Button>
        </Box>
      </Box>
    </Box>
  );
}

function Order() {
  const [dialogReview, setDialogReview] = React.useState(false);
  const [dialogDetail, setDialogDetail] = React.useState(false);

  const handleOpenReview = () => {
    setDialogReview(true);
  };

  const handleCloseReview = () => {
    setDialogReview(false);
  };

  const handleOpenDetail = () => {
    setDialogDetail(true);
  };

  const handleCloseDetail = () => {
    setDialogDetail(false);
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" gap={2}>
        {
          [1, 2, 3, 4, 5].map(() => (
            <OrderItem onOpenReview={handleOpenReview} onOpenDetail={handleOpenDetail} />
          ))
        }
      </Box>
      <ReviewDialog open={dialogReview} onClose={handleCloseReview} />
      <OrderDetailDialog open={dialogDetail} onClose={handleCloseDetail} />
    </Container>
  );
}

export default Order;
