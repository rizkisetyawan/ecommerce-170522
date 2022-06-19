/* eslint-disable react/prop-types */
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { postTrx, getBank, rp } from '../../utils';

function PayModal({ open, onClose, data }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [selectBankState, setSelectBankState] = useState(null);
  const [formState, setFormState] = useState({
    loading: false,
    data: null,
  });
  const [bankState, setBankState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchBank = async () => {
    setBankState({ ...bankState, loading: true });
    try {
      const bank = await getBank();
      if (bank.status !== 'success') {
        throw new Error(bank.message);
      }
      setBankState({
        ...bankState,
        loading: false,
        data: bank.data,
      });
      setSelectBankState(bank.data[0]);
    } catch (err) {
      setBankState({
        ...bankState,
        loading: false,
        message: err.message,
      });
    }
  };

  const handleSubmit = async () => {
    setFormState({ ...formState, loading: true });
    try {
      const trx = await postTrx({
        id_item_order: `INV-${moment().format('YYYYMMDD')}-${Date.now()}`,
        id_item: data.id_item,
        qty: data.qty,
        description: data.description,
        payment: selectBankState.bank_name,
        status: 'belum dibayar',
        price: data.price,
      });
      if (trx.status !== 'success') {
        throw new Error(trx.message);
      }
      setFormState({ ...formState, loading: false });
      navigate(`/payment/${trx.data.id_item_order}`);
    } catch (err) {
      setFormState({ ...formState, loading: false });
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchBank();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogContent>
        <Typography fontSize={18} fontWeight={800}>Pembayaran</Typography>
        <Typography fontWeight={800} color="text.secondary" mb={2}>Transfer Bank (Verifikasi Manual)</Typography>
        { bankState.loading && (
          <Box display="flex" justifyContent="center" py={4}>
            <Typography color="text.secondary">Loading ...</Typography>
          </Box>
        )}
        { (!bankState.loading && bankState.message) && (
          <Box display="flex" justifyContent="center" py={4}>
            <Typography color="text.secondary">{bankState.message}</Typography>
          </Box>
        )}
        { (!bankState.loading && bankState.data) && (
          <>
            <List>
              {bankState.data.map((row) => (
                <ListItem
                  disablePadding
                  key={row.name}
                  sx={{
                    border: 1,
                    borderColor: row.bank_name !== selectBankState.bank_name ? 'divider' : 'primary.dark',
                    borderRadius: 2,
                    my: 0.5,
                  }}
                >
                  <ListItemButton onClick={() => setSelectBankState(row)} sx={{ py: 0.5 }}>
                    <ListItemAvatar>
                      <Avatar src={row.logo} variant="square" alt={row.bank_name} sx={{ '& img': { objectFit: 'contain' } }} />
                    </ListItemAvatar>
                    <ListItemText sx={{ '& span': { fontSize: 14 } }}>
                      Transfer Bank
                      {' '}
                      <span style={{ textTransform: 'uppercase' }}>{row.bank_name}</span>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Box mt={2} mb={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                <Typography fontWeight={800} fontSize={14}>
                  Transfer Bank ke
                  {' '}
                  <span style={{ textTransform: 'uppercase' }}>{selectBankState.bank_name}</span>
                </Typography>
                <Avatar src={selectBankState.logo} variant="square" alt="testing" sx={{ '& img': { objectFit: 'contain' }, width: 50, height: 50 }} />
              </Box>
              <Typography fontSize={12} color="text.secondary">Total Tagihan</Typography>
              <Typography fontSize={18} color="primary" fontWeight={800}>{rp(data.price)}</Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ fontWeight: 800 }}
              onClick={handleSubmit}
              disabled={formState.loading}
            >
              {formState.loading ? 'Loading ...' : 'Bayar'}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PayModal;
