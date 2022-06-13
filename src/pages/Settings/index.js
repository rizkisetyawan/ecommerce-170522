/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Check, Close } from '@mui/icons-material';
import {
  Avatar,
  Container,
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Stack,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment';
import id from 'moment/locale/id';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { putUserDetail } from '../../utils';
import { updateUser } from '../../redux/sliceAuth';

function ActionInputText({ loading, onCancel, onCheckSubmit }) {
  return (
    <Box>
      { loading && (
        <Typography color="text.secondary" fontSize={12}>Loading ...</Typography>
      )}
      { !loading && (
        <>
          <IconButton aria-label="cancel" onClick={onCancel}>
            <Close fontSize="small" color="error" />
          </IconButton>
          <IconButton aria-label="submit" onClick={onCheckSubmit}>
            <Check fontSize="small" color="primary" />
          </IconButton>
        </>
      )}
    </Box>
  );
}

function InputText({
  onCancel,
  column,
  value,
}) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [formState, setFormState] = useState({
    [column]: value,
    loading: false,
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [column]: e.target.value,
    });
  };

  const handleCheckSubmit = async () => {
    setFormState({ ...formState, loading: true });
    try {
      const user = await putUserDetail({ [column]: formState[column] });
      setFormState({ ...formState, loading: false });
      if (user.status === 'success') {
        dispatch(updateUser({ [column]: formState[column] }));
        onCancel();
        return;
      }
      throw new Error(user.message);
    } catch (err) {
      setFormState({ ...formState, loading: false });
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  if (column === 'ttl') {
    return (
      <Box display="flex" alignItems="center" gap={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <MobileDatePicker
              inputFormat="dd/MM/yyyy"
              value={formState[column]}
              onChange={(newValue) => setFormState({ ...formState, [column]: moment(newValue).format('YYYY-MM-DD') })}
              renderInput={(params) => <TextField variant="standard" {...params} size="small" sx={{ '& input': { fontSize: 14 }, maxWidth: 80 }} />}
            />
          </Stack>
        </LocalizationProvider>
        <ActionInputText
          loading={formState.loading}
          onCancel={onCancel}
          onCheckSubmit={handleCheckSubmit}
        />
      </Box>
    );
  }

  if (column === 'gender') {
    return (
      <Box display="flex" alignItems="center" gap={2}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formState[column]}
          onChange={handleChange}
          variant="standard"
          size="small"
          sx={{ width: 100, fontSize: 12 }}
        >
          <MenuItem value="Pria">Pria</MenuItem>
          <MenuItem value="Wanita">Wanita</MenuItem>
        </Select>
        <ActionInputText
          loading={formState.loading}
          onCancel={onCancel}
          onCheckSubmit={handleCheckSubmit}
        />
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <TextField
        onChange={handleChange}
        value={formState[column]}
        variant="standard"
        size="small"
        sx={{ '& input': { fontSize: 12 } }}
      />
      <ActionInputText
        loading={formState.loading}
        onCancel={onCancel}
        onCheckSubmit={handleCheckSubmit}
      />
    </Box>
  );
}

function Settings() {
  const user = useSelector(({ auth }) => auth.user);
  const [editState, setEditState] = useState({
    name: false,
    ttl: false,
    gender: false,
    hp: false,
    email: false,
  });

  const handleEditState = (name, value) => {
    setEditState({
      ...editState,
      [name]: value,
    });
  };

  return (
    <Container>
      <Grid container p={{ xs: 0, md: 2 }} spacing={{ xs: 2, md: 6 }}>
        {!user && (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography color="text.primary">Loading ...</Typography>
            </Box>
          </Grid>
        )}
        {user && (
          <>
            <Grid item xs={12} md={4}>
              <Box
                p={2}
                borderRadius={1}
                boxShadow="0 1px 6px 0 rgba(49,53,59,0.12)"
              >
                <Box display="flex" justifyContent="center">
                  <Avatar
                    src={user.foto}
                    alt={user.name || user.email}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: 400,
                      maxHeight: 400,
                      mb: 2,
                    }}
                    variant="square"
                  />
                </Box>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: 'text.primary',
                    borderColor: 'divider',
                    mb: 2,
                  }}
                >
                  Pilih Foto
                </Button>
                <Typography fontSize={12} color="text.secondary">
                  Besar file: maksimum 10.000.000 bytes (10 Megabytes).
                  Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box px={2}>
                <Typography fontSize={14} color="text.secondary" fontWeight={800} my={2}>Ubah Biodata Diri</Typography>
                <Grid container spacing={2}>
                  {[
                    {
                      title: 'Nama',
                      column: 'name',
                    },
                    {
                      title: 'Tanggal Lahir',
                      column: 'ttl',
                    },
                    {
                      title: 'Gender',
                      column: 'gender',
                    },
                  ].map((row) => (
                    <React.Fragment key={row.column}>
                      <Grid item xs={4} lg={2}><Typography fontSize={13} color="text.secondary">{row.title}</Typography></Grid>
                      <Grid item xs={8} lg={10}>
                        {editState[row.column] ? (
                          <InputText
                            column={row.column}
                            value={user[row.column]}
                            onCancel={() => handleEditState(row.column, false)}
                          />
                        ) : (
                          <Typography fontSize={13} color="text.secondary">
                            {row.column === 'ttl' ? moment(user[row.column]).locale('id', id).format('DD MMMM YYYY') : user[row.column]}
                            <span style={{ display: 'inline-block', width: 20 }} />
                            <span
                              style={{ color: '#03ac0e', cursor: 'pointer' }}
                              onClick={() => handleEditState(row.column, true)}
                              role="button"
                              tabIndex={0}
                            >
                              {user[row.column] ? 'Ubah' : 'Tambah'}
                            </span>
                          </Typography>
                        )}
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
                <Typography fontSize={14} color="text.secondary" fontWeight={800} mb={2} mt={4}>Ubah Kontak</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={2}><Typography fontSize={13} color="text.secondary">Nomor HP</Typography></Grid>
                  <Grid item xs={8} lg={10}>
                    {editState.hp ? (
                      <InputText
                        column="hp"
                        value={user.hp}
                        onCancel={() => handleEditState('hp', false)}
                      />
                    ) : (
                      <Typography fontSize={13} color="text.secondary">
                        {user.hp}
                        <span style={{ display: 'inline-block', width: 20 }} />
                        <span
                          style={{ color: '#03ac0e', cursor: 'pointer' }}
                          onClick={() => handleEditState('hp', true)}
                          role="button"
                          tabIndex={0}
                        >
                          {user.hp ? 'Ubah' : 'Tambah'}
                        </span>
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={4} lg={2}><Typography fontSize={13} color="text.secondary">Email</Typography></Grid>
                  <Grid item xs={8} lg={10}>
                    {editState.email ? <InputText column="email" value={user.email} onCancel={() => handleEditState('email', false)} /> : (
                      <Typography fontSize={13} color="text.secondary">
                        {user.email}
                        <span style={{ display: 'inline-block', width: 20 }} />
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default Settings;
