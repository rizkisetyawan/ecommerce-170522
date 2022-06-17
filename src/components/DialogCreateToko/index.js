/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { Edit, PhotoCamera } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { updateIdentity } from '../../redux/sliceAuth';
import {
  getImageAuth, postFoto, postToko, getIdentity,
} from '../../utils';

const styledInput = { mb: 1.5, '& label': { fontSize: 14 } };

function DialogCreateToko({ open, onClose }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [formState, setFormState] = useState({
    name: '',
    address: '',
    description: '',
    image: null,
    imageRead: null,
    loading: false,
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

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setFormState({ ...formState, loading: true });
    try {
      const imageAuth = await getImageAuth();
      const foto = await postFoto({
        file: formState.image,
        signature: imageAuth.signature,
        expire: imageAuth.expire,
        token: imageAuth.token,
        folder: '/user',
        fileName: `img-${Date.now()}`,
      });
      const toko = await postToko({
        name: formState.name,
        address: formState.address,
        description: formState.description,
        image: foto.url,
        status: 'active',
      });
      setFormState({ ...formState, loading: false });
      if (toko.status === 'success') {
        setFormState({ ...formState, imageRead: null });
        enqueueSnackbar(toko.message, { variant: 'success' });
        onClose();
        const detailUser = await getIdentity();
        dispatch(updateIdentity(detailUser.data));
      } else {
        enqueueSnackbar(toko.message, { variant: 'error' });
      }
    } catch (err) {
      setFormState({ ...formState, loading: false });
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <Box py={3} px={{ xs: 2, md: 4 }}>
        <Typography fontWeight={800} textAlign="center">BUKA TOKO GRATIS</Typography>
        <Box
          display="flex"
          justifyContent="center"
          my={2}
        >
          { formState.imageRead && (
            <Box display="flex" gap={1} position="relative">
              <Avatar
                alt="toko"
                src={formState.imageRead}
                sx={{
                  width: 80, height: 80,
                }}
              />
              <label htmlFor="contained-button-file" style={{ position: 'absolute', right: -75, bottom: 0 }}>
                <input style={{ display: 'none' }} accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImageChange} />
                <Button
                  size="small"
                  variant="outlined"
                  component="span"
                  startIcon={<Edit />}
                  sx={{
                    fontWeight: 800,
                    fontSize: 12,
                    textTransform: 'capitalize',
                  }}
                >
                  Foto
                </Button>
              </label>
            </Box>
          )}
          { !formState.imageRead && (
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 40,
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
        </Box>
        <TextField name="name" onChange={handleChange} fullWidth variant="outlined" label="Nama Toko" size="small" sx={styledInput} />
        <TextField name="address" onChange={handleChange} fullWidth variant="outlined" label="Alamat" size="small" sx={styledInput} />
        <TextField name="description" onChange={handleChange} fullWidth variant="outlined" label="Deskripsi" size="small" multiline rows={4} sx={styledInput} />
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            sx={{ fontSize: 14, textTransform: 'capitalize', fontWeight: 800 }}
            onClick={onClose}
            disabled={formState.loading}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            sx={{ fontSize: 14, textTransform: 'capitalize', fontWeight: 800 }}
            onClick={handleSubmit}
            disabled={formState.loading}
          >
            {formState.loading ? 'Loading ...' : 'Buka Toko'}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default DialogCreateToko;
