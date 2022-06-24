/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Edit, PhotoCamera } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { getImageAuth, postFoto, putTrxFoto } from '../../utils';

const initForm = {
  loading: false,
  image: null,
  imageRead: null,
};

function DialogUploadStruk({
  open, onClose, data, onSuccess,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [formState, setFormState] = useState({
    ...initForm,
    imageRead: data?.foto_trx,
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

  const handleSubmit = async () => {
    setFormState({ ...formState, loading: true });
    try {
      const imageAuth = await getImageAuth();
      const foto = await postFoto({
        file: formState.image,
        signature: imageAuth.signature,
        expire: imageAuth.expire,
        token: imageAuth.token,
        folder: '/transaksi',
        fileName: `img-${Date.now()}`,
      });
      const trx = await putTrxFoto(data.id_item_order, data.items
        .map((row) => ({ id_item: row.id_item, foto_trx: foto.url })));
      if (trx.status !== 'success') {
        throw new Error(trx.message);
      }
      setFormState(initForm);
      onSuccess();
      onClose();
    } catch (err) {
      setFormState({ ...formState, loading: false });
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    if (data) {
      setFormState({
        ...formState,
        imageRead: data.foto_trx,
      });
    }
  }, [data]);

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
          <Button
            size="small"
            variant="contained"
            sx={{ fontSize: 12, fontWeight: 800 }}
            disabled={!formState.image || formState.loading}
            onClick={handleSubmit}
          >
            { formState.loading ? 'Loading ...' : 'Kirim' }
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DialogUploadStruk;
