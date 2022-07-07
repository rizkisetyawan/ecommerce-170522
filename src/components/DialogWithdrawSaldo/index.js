/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Chip,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { Refresh } from '@mui/icons-material';
import { updateIdentity } from '../../redux/sliceAuth';
import {
  postWithdraw, getIdentity, rp, getWithdrawUmkm,
} from '../../utils';

const initForm = {
  loading: false,
  withdraw: '',
};

const initWithdraw = {
  loading: false,
  data: null,
  message: null,
};

function DialogWithdrawSaldo({
  open = false, onClose, data,
}) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [formState, setFormState] = useState(initForm);
  const [withdrawState, setWithdrawState] = useState(initWithdraw);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFormState(initForm);
    }, 500);
  };

  const handleSubmit = async () => {
    setFormState({ ...formState, loading: true });
    try {
      if (Number(formState.withdraw) > Number(data.saldo)) {
        throw new Error('Saldo toko anda tidak cukup');
      }
      if (Number(formState.withdraw) <= 50000) {
        throw new Error('Minimum penarikan saldo Rp 50.000');
      }
      const withdraw = await postWithdraw({
        idUmkm: data.id_umkm,
        withdraw: Number(formState.withdraw),
      });
      if (withdraw.status !== 'success') {
        throw new Error(withdraw.message);
      }
      const detailUser = await getIdentity();
      dispatch(updateIdentity(detailUser.data));
      setFormState(initForm);
      fetchWithdraw();
    } catch (err) {
      setFormState(initForm);
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const fetchWithdraw = async () => {
    setWithdrawState({ ...withdrawState, loading: true });
    try {
      const withdraw = await getWithdrawUmkm(data.id_umkm);
      if (withdraw.status !== 'success') {
        throw new Error(withdraw.message);
      }
      setWithdrawState({ ...withdrawState, loading: false, data: withdraw.data });
    } catch (err) {
      setWithdrawState({ ...withdrawState, loading: false, message: err.message });
    }
  };

  useEffect(() => {
    fetchWithdraw();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <Box py={3} px={{ xs: 2, md: 4 }} minWidth={300}>
        <Typography fontSize={20} fontWeight={800} color="primary" mb={2}>
          Penarikan Saldo
        </Typography>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={5}>
            <Typography fontSize={{ xs: 14, md: 16 }} color="text.secondary">Saldo Toko</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography fontSize={{ xs: 14, md: 16 }} sx={{ color: 'success.main' }}>
              :
              {' '}
              {rp(data.saldo)}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography fontSize={{ xs: 14, md: 16 }} color="text.secondary">No. Rekening</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography fontSize={{ xs: 14, md: 16 }} color="text.secondary">
              :
              {' '}
              {data.rek_no}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography fontSize={{ xs: 14, md: 16 }} color="text.secondary">Bank Penerima</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography fontSize={{ xs: 14, md: 16 }} color="text.secondary">
              :
              {' '}
              {data.rek_bank}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography fontSize={{ xs: 14, md: 16 }} color="text.secondary">Nama Penerima</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography fontSize={{ xs: 14, md: 16 }} color="text.secondary">
              :
              {' '}
              {data.rek_name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography mt={3} fontSize={{ xs: 14, md: 16 }} color="text.secondary">Jumlah Penarikan</Typography>
          </Grid>
          <Grid item xs={7}>
            { withdrawState.data && (
              <Box display="flex" gap={1} mb={3} mt={2} alignItems="center">
                <Typography fontSize={14} sx={{ color: 'error.main' }}>
                  :
                  {' '}
                  {rp(withdrawState.data.withdraw)}
                </Typography>
                <Chip label={withdrawState.data.status} size="small" variant="contained" color="warning" />
                <Tooltip title="refresh">
                  <IconButton onClick={fetchWithdraw}>
                    <Refresh />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            { !withdrawState.data && (
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment position="start" sx={{ '& p': { fontSize: 14, color: 'error.main' } }}>Rp</InputAdornment>,
                }}
                size="small"
                type="number"
                sx={{ mt: 2, '& input': { fontSize: 14, color: 'error.main' } }}
                value={formState.withdraw}
                onChange={(e) => setFormState((oldState) => ({ ...oldState, withdraw: e.target.value }))}
              />
            )}
          </Grid>
        </Grid>
        { !withdrawState.data && (
          <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
            <Button
              sx={{ fontSize: 14, textTransform: 'capitalize', fontWeight: 800 }}
              onClick={handleClose}
              disabled={formState.loading}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ fontSize: 14, textTransform: 'capitalize', fontWeight: 800 }}
              onClick={handleSubmit}
              disabled={formState.loading || !formState.withdraw}
            >
              Konfirmasi
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}

export default DialogWithdrawSaldo;
