/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Avatar, Box, Button, Chip, Container, Typography,
} from '@mui/material';
import moment from 'moment';
import { useSnackbar } from 'notistack';

import { getAllWithdraw, putWithrawDone, rp } from '../../utils';

function ActionButton({ enqueueSnackbar, idHistory, onSuccess }) {
  const [loadingState, setLoadingState] = useState(false);

  const handleButton = async () => {
    setLoadingState(true);
    try {
      const updated = await putWithrawDone(idHistory);
      if (updated.status !== 'success') {
        throw new Error(updated.message);
      }
      setLoadingState(false);
      onSuccess();
    } catch (err) {
      setLoadingState(false);
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Button
      size="small"
      variant="outlined"
      disabled={loadingState}
      onClick={handleButton}
      sx={{ textTransform: 'capitalize', fontSize: 12, mr: 1 }}
    >
      Kirim Saldo
    </Button>
  );
}

function AdminWithdraw() {
  const { enqueueSnackbar } = useSnackbar();
  const [transactionsState, setTransactionsState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchTransactions = async (withLoading = true) => {
    if (withLoading) {
      setTransactionsState({ ...transactionsState, loading: true });
    }
    try {
      const transactions = await getAllWithdraw();
      if (transactions.status !== 'success') {
        throw new Error(transactions.message);
      }
      setTransactionsState({
        ...transactionsState,
        loading: false,
        data: transactions.data,
      });
    } catch (err) {
      setTransactionsState({
        ...transactionsState,
        loading: false,
        message: err.message,
      });
    }
  };

  const handleSuccess = () => {
    fetchTransactions(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const columns = [
    {
      field: 'foto',
      headerName: '',
      renderCell: (params) => <Avatar src={params.row.foto} />,
      sortable: false,
      disableColumnMenu: true,
      width: 70,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'name',
      headerName: 'Toko',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'rek_no',
      headerName: 'No. Rekening',
      width: 150,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'rek_bank',
      headerName: 'Bank',
      width: 80,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'rek_name',
      headerName: 'Nama Penerima',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'withdraw',
      headerName: 'Jumlah Penarikan',
      width: 150,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'created_at',
      headerName: 'Created',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      align: 'center',
      headerAlign: 'center',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          size="small"
          variant="contained"
          color={params.row.status === 'selesai' ? 'success' : 'warning'}
        />
      ),
    },
    {
      field: 'action',
      headerName: '',
      minWidth: 150,
      flex: 1,
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box>
          {params.row.status.includes('diproses') && (
            <ActionButton
              enqueueSnackbar={enqueueSnackbar}
              idHistory={params.row.id}
              onSuccess={handleSuccess}
            />
          )}
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ width: '100%', height: 'calc(100vh - 112px)', padding: '0 !important' }}>
      { transactionsState.loading && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { (!transactionsState.loading && transactionsState.message) && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">{transactionsState.message}</Typography>
        </Box>
      )}
      { (!transactionsState.loading && transactionsState.data) && (
        <DataGrid
          rows={transactionsState.data.map((row) => ({
            ...row,
            withdraw: rp(row.withdraw),
            created_at: moment(row.created_at).format('YYYY-MM-DD HH:mm'),
          }))}
          columns={columns}
        />
      )}
    </Container>
  );
}

export default AdminWithdraw;
