/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Avatar,
  Box,
  Button,
  Dialog,
  TextField,
} from '@mui/material';
import React from 'react';

function DialogCreateToko({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <Box py={3} px={{ xs: 2, md: 4 }}>
        <Box display="flex" justifyContent="center" mb={1.5}>
          <Avatar
            alt="toko"
            src="https://source.unsplash.com/random"
            sx={{
              width: 80, height: 80,
            }}
          />
        </Box>
        <TextField fullWidth variant="outlined" label="Nama Toko" size="small" sx={{ mb: 1.5, '& label': { fontSize: 14 } }} />
        <TextField fullWidth variant="outlined" label="Alamat" size="small" sx={{ mb: 1.5, '& label': { fontSize: 14 } }} />
        <TextField fullWidth variant="outlined" label="No. Rekening" size="small" sx={{ mb: 1.5, '& label': { fontSize: 14 } }} />
        <TextField fullWidth variant="outlined" label="Deskripsi" size="small" multiline rows={4} sx={{ mb: 1.5, '& label': { fontSize: 14 } }} />
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button sx={{ fontSize: 14, textTransform: 'capitalize', fontWeight: 800 }} onClick={onClose}>
            Batal
          </Button>
          <Button variant="contained" sx={{ fontSize: 14, textTransform: 'capitalize', fontWeight: 800 }} onClick={() => alert('under development')}>
            Buka Toko
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default DialogCreateToko;
