/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Avatar, Link,
  Box, Button, Container, Typography,
} from '@mui/material';
import moment from 'moment';
import { useSnackbar } from 'notistack';

import { getAllTrx, putTrxStatusAll, rp } from '../../utils';

function ActionButton({ enqueueSnackbar, idItemOrder, onSuccess }) {
  const [loadingState, setLoadingState] = useState(false);

  const handleButton = async (status) => {
    setLoadingState(true);
    try {
      const updated = await putTrxStatusAll(idItemOrder, { status });
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
    <>
      <Button
        size="small"
        variant="outlined"
        disabled={loadingState}
        onClick={() => handleButton('diproses')}
        sx={{ textTransform: 'capitalize', fontSize: 12, mr: 1 }}
      >
        Proses
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="error"
        disabled={loadingState}
        onClick={() => handleButton('dibatalkan')}
        sx={{ textTransform: 'capitalize', fontSize: 12 }}
      >
        Batalkan
      </Button>
    </>
  );
}

function AdminTransactions() {
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
      const transactions = await getAllTrx();
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
      field: 'id',
      headerName: 'No Invoice',
      width: 250,
    },
    {
      field: 'total_price',
      headerName: 'Harga',
      width: 140,
    },
    {
      field: 'foto_trx',
      headerName: 'Bukti Pembayaran',
      width: 170,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (params.row.foto_trx ? (
        <Link href={params.row.foto_trx} target="_blank">
          <Avatar variant="square" src={params.row.foto_trx} sx={{ borderRadius: 1 }} />
        </Link>
      ) : '-'),
    },
    {
      field: 'total_status',
      headerName: 'Status',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'Created',
      width: 150,
      align: 'center',
      headerAlign: 'center',
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
          {params.row.total_status.includes('belum dibayar') && (
            <ActionButton
              enqueueSnackbar={enqueueSnackbar}
              idItemOrder={params.row.id_item_order}
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
            total_price: rp(row.total_price),
            created_at: moment(row.created_at).format('YYYY-MM-DD HH:mm'),
          }))}
          columns={columns}
        />
      )}
    </Container>
  );
}

export default AdminTransactions;
