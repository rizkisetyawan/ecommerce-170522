/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Edit, PhotoCamera } from '@mui/icons-material';

function DialogUploadStruk({ open, onClose, data }) {
  const [formState, setFormState] = useState({
    loading: false,
    image: null,
    imageRead: null,
  });

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFormState({
        ...formState,
        image: event.target.files[0],
        imageRead: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogContent>
        <Typography fontSize={14} color="text.secondary" fontWeight={800}>
          UPLOAD BUKTI PEMBAYARAN
        </Typography>
        { formState.imageRead && (
          <Box mt={2} position="relative">
            <Avatar
              src={formState.imageRead}
              sx={{
                width: '100%', height: 'auto', borderRadius: 1,
              }}
            />
            <label htmlFor="contained-button-file" style={{ position: 'absolute', left: 0, bottom: 0 }}>
              <input style={{ display: 'none' }} accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImageChange} />
              <Button
                size="small"
                variant="contained"
                component="span"
                startIcon={<Edit />}
                sx={{
                  fontWeight: 800,
                  fontSize: 12,
                  textTransform: 'capitalize',
                }}
              >
                Ubah
              </Button>
            </label>
          </Box>
        )}
        { !formState.imageRead && (
          <Box
            sx={{
              mt: 2,
              width: '100%',
              height: 200,
              borderRadius: 1,
              bgcolor: '#f0f0f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <label htmlFor="icon-button-file">
              <input style={{ display: 'none' }} id="icon-button-file" type="file" onChange={handleImageChange} />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
        )}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button size="small" onClick={onClose} sx={{ fontSize: 12, fontWeight: 800, mr: 1 }}>
            Batal
          </Button>
          <Button size="small" variant="contained" sx={{ fontSize: 12, fontWeight: 800 }}>
            Kirim
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DialogUploadStruk;
