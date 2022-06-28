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
import {
  getImageAuth, postFoto, postCategory, putCategory,
} from '../../utils';

const styledInput = { '& input': { fontSize: 14, textTransform: 'capitalize' } };

const initForm = {
  name: '',
  image: null,
  imageRead: null,
  loading: false,
};

function DialogCreateCategory({
  open = false, onClose, data, action, onSuccess,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [formState, setFormState] = useState(initForm);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFormState({
        ...formState,
        image: event.target.files[0],
        imageRead: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFormState(initForm);
    }, 500);
  };

  const handleSubmit = async () => {
    setFormState({ ...formState, loading: true });
    try {
      let foto;
      let category;
      if (formState.image) {
        const imageAuth = await getImageAuth();
        foto = await postFoto({
          file: formState.image,
          signature: imageAuth.signature,
          expire: imageAuth.expire,
          token: imageAuth.token,
          folder: '/category',
          fileName: `img-${Date.now()}`,
        });
      }
      if (action === 'add') {
        category = await postCategory({ name: formState.name, foto: foto.url });
      }
      if (action === 'edit') {
        category = await putCategory(formState.name, { foto: foto.url });
      }
      setFormState({ ...formState, loading: false });
      if (category.status === 'success') {
        handleClose();
        enqueueSnackbar(category.message, { variant: 'success' });
        onClose();
        onSuccess(category.data);
      } else {
        enqueueSnackbar(category.message, { variant: 'error' });
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
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <Box py={3} px={{ xs: 2, md: 4 }}>
        <Typography fontWeight={800} textAlign="center">{action === 'add' ? 'BUAT KATEGORI BARU' : 'UBAH KATEGORI'}</Typography>
        <Box
          display="flex"
          justifyContent="center"
          my={2}
        >
          { formState.imageRead && (
            <Box display="flex" gap={1} position="relative">
              <Avatar
                variant="square"
                src={formState.imageRead}
                sx={{
                  width: 80, height: 80, borderRadius: 1,
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
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={3} display="flex" alignItems="center"><Typography fontSize={14}>Kategori</Typography></Grid>
          <Grid item xs={9}>
            <TextField
              disabled={action === 'edit'}
              name="name"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              fullWidth
              variant="outlined"
              size="small"
              sx={styledInput}
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
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
            disabled={formState.loading}
          >
            { formState.loading && 'Loading ...' }
            { (!data && !formState.loading) && 'Simpan' }
            { (data && !formState.loading) && 'Ubah' }
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default DialogCreateCategory;
