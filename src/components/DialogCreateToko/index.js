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
  Grid,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { updateIdentity } from '../../redux/sliceAuth';
import {
  getImageAuth, postFoto, postToko, getIdentity, putToko,
} from '../../utils';

const styledInput = { '& input': { fontSize: 14 } };

function DialogCreateToko({
  open, onClose, data, action,
}) {
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
      let foto;
      let toko;
      if (formState.image) {
        const imageAuth = await getImageAuth();
        foto = await postFoto({
          file: formState.image,
          signature: imageAuth.signature,
          expire: imageAuth.expire,
          token: imageAuth.token,
          folder: '/user',
          fileName: `img-${Date.now()}`,
        });
      }
      if (action === 'add') {
        toko = await postToko({
          name: formState.name,
          address: formState.address,
          description: formState.description,
          image: foto.url,
          status: 'aktif',
        });
      }
      if (action === 'edit') {
        toko = await putToko(formState.id_umkm, {
          name: formState.name,
          address: formState.address,
          description: formState.description,
          image: foto ? foto.url : formState.foto,
        });
      }
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

  useEffect(() => {
    if (data) {
      setFormState({
        ...formState,
        ...data,
        imageRead: data.foto,
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <Box py={3} px={{ xs: 2, md: 4 }}>
        <Typography fontWeight={800} textAlign="center">{action === 'add' ? 'BUKA TOKO GRATIS' : 'UBAH DATA TOKO'}</Typography>
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
        <Grid container spacing={2}>
          <Grid item xs={3} display="flex" alignItems="center"><Typography fontSize={14}>Nama Toko</Typography></Grid>
          <Grid item xs={9}><TextField name="name" onChange={handleChange} value={formState.name} fullWidth variant="outlined" size="small" sx={styledInput} /></Grid>
          <Grid item xs={3} display="flex" alignItems="center"><Typography fontSize={14}>Alamat</Typography></Grid>
          <Grid item xs={9}><TextField name="address" onChange={handleChange} value={formState.address} fullWidth variant="outlined" size="small" sx={styledInput} /></Grid>
          <Grid item xs={3}><Typography fontSize={14}>Deskripsi</Typography></Grid>
          <Grid item xs={9}><TextField name="description" onChange={handleChange} value={formState.description} fullWidth variant="outlined" size="small" multiline rows={4} sx={styledInput} /></Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
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
            { formState.loading && 'Loading ...' }
            { (!data && !formState.loading) && 'Buka Toko' }
            { (data && !formState.loading) && 'Ubah Toko' }
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default DialogCreateToko;
