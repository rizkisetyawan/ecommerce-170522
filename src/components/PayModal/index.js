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
import React, { useState } from 'react';

function PayModal({ open, onClose }) {
  const navigate = useNavigate();
  const listBank = [
    {
      name: 'bca',
    },
    {
      name: 'bni',
    },
    {
      name: 'bri',
    },
    {
      name: 'cimb',
    },
  ];
  const [selectBankState, setSelectBankState] = useState(listBank[0].name);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogContent>
        <Typography fontSize={18} fontWeight={800}>Pembayaran</Typography>
        <Typography fontWeight={800} color="text.secondary" mb={2}>Transfer Bank (Verifikasi Manual)</Typography>
        <List>
          {listBank.map((row) => (
            <ListItem
              disablePadding
              key={row.name}
              sx={row.name === selectBankState && {
                border: 1, borderColor: 'error.main', borderRadius: 2, my: 0.5,
              }}
            >
              <ListItemButton onClick={() => setSelectBankState(row.name)} sx={{ py: 0.5 }}>
                <ListItemAvatar>
                  <Avatar src={`logoBank/${row.name}.png`} variant="square" alt="testing" sx={{ '& img': { objectFit: 'contain' } }} />
                </ListItemAvatar>
                <ListItemText sx={{ '& span': { fontSize: 14 } }}>
                  Transfer Bank
                  {' '}
                  <span style={{ textTransform: 'uppercase' }}>{row.name}</span>
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
              <span style={{ textTransform: 'uppercase' }}>{selectBankState}</span>
            </Typography>
            <Avatar src={`logoBank/${selectBankState}.png`} variant="square" alt="testing" sx={{ '& img': { objectFit: 'contain' }, width: 50, height: 50 }} />
          </Box>
          <Typography fontSize={12} color="text.secondary">Total Tagihan</Typography>
          <Typography fontSize={18} color="primary" fontWeight={800}>Rp2.543.000</Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          sx={{ fontWeight: 800 }}
          onClick={() => navigate('/payment')}
        >
          Bayar
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default PayModal;
