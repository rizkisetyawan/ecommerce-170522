/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { Edit, PhotoCamera } from '@mui/icons-material';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import {
  getImageAuth,
  getCategory,
  getDetailProduct,
  postFoto,
  postProduct,
  putProduct,
} from '../../utils';

const styledInput = { '& input': { fontSize: { xs: 12, sm: 14 } } };
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const initForm = {
  category: '',
  name: '',
  price: '',
  stock: '',
  status: 'aktif',
  description: '',
  image: null,
  imageRead: null,
  loading: false,
  message: null,
};

function DialogCreateProduct({
  open,
  onClose,
  onSuccess,
  data,
  action,
}) {
  const toko = useSelector(({ auth }) => auth.toko);
  const { enqueueSnackbar } = useSnackbar();
  const [formState, setFormState] = useState(initForm);
  const [categoryState, setCategoryState] = useState({
    loading: false,
    data: null,
    message: null,
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
      if (!formState.imageRead) {
        throw new Error('Foto tidak boleh kosong');
      }
      let foto;
      let product;
      if (formState.image) {
        const imageAuth = await getImageAuth();
        foto = await postFoto({
          file: formState.image,
          signature: imageAuth.signature,
          expire: imageAuth.expire,
          token: imageAuth.token,
          folder: '/product',
          fileName: `img-${Date.now()}`,
        });
      }
      if (action === 'add') {
        product = await postProduct({
          id_umkm: toko.id_umkm,
          category: formState.category,
          name: formState.name,
          price: formState.price,
          stock: formState.stock,
          description: formState.description,
          status: formState.status,
          foto: foto.url,
        });
      }
      if (action === 'edit') {
        product = await putProduct(
          formState.id_item,
          {
            category: formState.category,
            name: formState.name,
            price: formState.price,
            stock: formState.stock,
            description: formState.description,
            status: formState.status,
            foto: foto ? foto.url : formState.foto,
          },
        );
      }
      setFormState({ ...formState, loading: false });
      if (product.status === 'success') {
        setFormState(initForm);
        enqueueSnackbar(product.message, { variant: 'success' });
        onSuccess();
        onClose();
      } else {
        enqueueSnackbar(product.message, { variant: 'error' });
      }
    } catch (err) {
      setFormState({ ...formState, loading: false });
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFormState(initForm);
    }, 500);
  };

  const fetchCategory = async () => {
    setCategoryState({ ...categoryState, loading: true });
    try {
      const category = await getCategory();
      if (category.status !== 'success') {
        throw new Error(category.message);
      }
      setCategoryState({
        ...categoryState,
        loading: false,
        data: category.data.map(({ name }) => ({ label: name })),
      });
    } catch (err) {
      setCategoryState({
        ...categoryState,
        loading: false,
        message: 'Terjadi kesalahan, silahkan coba lagi nanti',
      });
    }
  };

  const fetchDetailProduct = async () => {
    setFormState({ ...formState, loading: true });
    try {
      const product = await getDetailProduct(data.id_item);
      if (product.status !== 'success') {
        throw new Error(product.message);
      }
      setFormState({
        ...formState,
        ...product.data.product,
        loading: false,
        imageRead: product.data.product.foto,
      });
    } catch (err) {
      setFormState({
        ...formState,
        loading: false,
        message: 'Terjadi kesalahan, silahkan coba lagi nanti',
      });
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (action === 'edit') {
      fetchDetailProduct();
    }
  }, [data]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <Box py={3} px={{ xs: 2, md: 4 }}>
        <Typography fontWeight={800} textAlign="center" mb={3}>
          { action === 'edit' && 'UBAH PRODUK'}
          { action === 'add' && 'TAMBAH PRODUK BARU'}
        </Typography>
        <Grid container rowSpacing={1.5} columnSpacing={1.5}>
          <Grid item xs={3} sm={4} display="flex" alignItems="center">
            <Typography fontSize={{ xs: 12, sm: 14 }}>Foto</Typography>
          </Grid>
          <Grid item xs={9} sm={8}>
            { formState.imageRead && (
              <Box display="flex" gap={1} position="relative">
                <Avatar
                  variant="square"
                  src={formState.imageRead}
                  sx={{
                    width: 50, height: 50, borderRadius: 1,
                  }}
                />
                <label htmlFor="contained-button-file" style={{ position: 'absolute', left: 60, bottom: 0 }}>
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
                  width: '100%',
                  maxWidth: 50,
                  height: 50,
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
          </Grid>
          <Grid item xs={3} sm={4} display="flex" alignItems="center">
            <Typography fontSize={{ xs: 12, sm: 14 }}>Nama Produk</Typography>
          </Grid>
          <Grid item xs={9} sm={8}>
            <TextField
              name="name"
              onChange={handleChange}
              value={formState.name}
              fullWidth
              variant="outlined"
              size="small"
              sx={styledInput}
            />
          </Grid>
          <Grid item xs={3} sm={4} display="flex" alignItems="center">
            <Typography fontSize={{ xs: 12, sm: 14 }}>Kategori</Typography>
          </Grid>
          <Grid item xs={9} sm={8}>
            { categoryState.loading && <Typography color="text.secondary" fontSize={12} mb={1.5}>Loading ...</Typography>}
            { (!categoryState.loading && categoryState.message) && <Typography color="text.secondary" fontSize={12} mb={1.5}>{categoryState.data}</Typography>}
            { (!categoryState.loading && categoryState.data) && (
              <Autocomplete
                value={formState.category}
                ListboxProps={{ style: { maxHeight: 150 } }}
                disablePortal
                id="combo-box-demo"
                options={categoryState.data}
                size="small"
                sx={styledInput}
                renderInput={(params) => <TextField {...params} />}
                onInputChange={(e, newValue) => setFormState({ ...formState, category: newValue })}
              />
            )}
          </Grid>
          <Grid item xs={3} sm={4} display="flex" alignItems="center">
            <Typography fontSize={{ xs: 12, sm: 14 }}>Harga</Typography>
          </Grid>
          <Grid item xs={9} sm={8}>
            <TextField
              name="price"
              type="number"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
              sx={styledInput}
              value={formState.price}
              InputProps={{
                min: 1,
                startAdornment: <InputAdornment position="start" sx={{ '& p': { fontSize: { xs: 12, sm: 14 } } }}>Rp</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={3} sm={4} display="flex" alignItems="center">
            <Typography fontSize={{ xs: 12, sm: 14 }}>Stok</Typography>
          </Grid>
          <Grid item xs={9} sm={8}>
            <TextField
              name="stock"
              type="number"
              value={formState.stock}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
              sx={{ ...styledInput, maxWidth: 70 }}
              InputProps={{
                inputProps: {
                  max: 100, min: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={3} sm={4} display="flex" alignItems="center">
            <Typography fontSize={{ xs: 12, sm: 14 }}>Aktif</Typography>
          </Grid>
          <Grid item xs={9} sm={8}>
            <Switch
              {...label}
              checked={formState.status === 'aktif'}
              onChange={(e) => setFormState({ ...formState, status: e.target.checked ? 'aktif' : 'tidak aktif' })}
            />
          </Grid>
          <Grid item xs={3} sm={4}>
            <Typography fontSize={{ xs: 12, sm: 14 }}>Deskripsi</Typography>
          </Grid>
          <Grid item xs={9} sm={8}>
            <TextField
              name="description"
              value={formState.description}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={4}
              sx={styledInput}
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
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
            {formState.loading && 'Loading ...' }
            {(!formState.loading && action === 'edit') && 'Ubah Produk' }
            {(!formState.loading && action === 'add') && 'Tambah Produk' }
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default DialogCreateProduct;
