/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box, Container, Typography, Switch, Avatar,
} from '@mui/material';
import moment from 'moment';

import { getAllUsers, putStatusUser, putRoleUser } from '../../utils';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function StatusSwitch({ id, isActive, type }) {
  const [checkedState, setCheckedState] = useState({
    isActive,
    loading: false,
    message: null,
  });

  const handleChecked = async (e) => {
    const { checked } = e.target;
    setCheckedState({ ...checkedState, loading: true });
    try {
      let user;
      if (type === 'status') {
        user = await putStatusUser(id, { status: checked ? 'aktif' : 'tidak aktif' });
      }
      if (type === 'role') {
        user = await putRoleUser(id, { role: checked ? 'admin' : 'user' });
      }
      if (user.status !== 'success') {
        throw new Error(user.message);
      }
      setCheckedState({ ...checkedState, loading: false, isActive: checked });
    } catch (err) {
      setCheckedState({ ...checkedState, loading: false, message: err.message });
    }
  };

  if (checkedState.loading) {
    return <Typography fontSize={12} color="text.secondary">Loading ...</Typography>;
  }

  if (!checkedState.loading && checkedState.message) {
    return <Typography fontSize={12} color="text.secondary">{checkedState.message}</Typography>;
  }

  return (
    <Switch
      {...label}
      checked={checkedState.isActive}
      onChange={handleChecked}
      color={type === 'status' ? 'primary' : 'success'}
    />
  );
}

function AdminUser() {
  const [usersState, setUsersState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchUsers = async () => {
    setUsersState({ ...usersState, loading: true });
    try {
      const users = await getAllUsers();
      if (users.status !== 'success') {
        throw new Error(users.message);
      }
      setUsersState({
        ...usersState,
        loading: false,
        data: users.data,
      });
    } catch (err) {
      setUsersState({
        ...usersState,
        loading: false,
        message: err.message,
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 200,
      flex: 1,
    },
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
      headerName: 'Nama',
      width: 200,
    },
    {
      field: 'hp',
      headerName: 'HP',
      width: 150,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'ttl',
      headerName: 'Tanggal Lahir',
      width: 150,
      align: 'center',
      headerAlign: 'center',
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
      headerName: 'Aktif',
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => <StatusSwitch id={params.id} isActive={params.row.status === 'aktif'} type="status" />,
    },
    {
      field: 'role',
      headerName: 'Admin',
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => <StatusSwitch id={params.id} isActive={params.row.role === 'admin'} type="role" />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ width: '100%', height: 'calc(100vh - 112px)', padding: '0 !important' }}>
      { usersState.loading && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { (!usersState.loading && usersState.message) && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">{usersState.message}</Typography>
        </Box>
      )}
      { (!usersState.loading && usersState.data) && (
        <DataGrid
          rows={usersState.data.map((row) => ({
            ...row,
            ttl: row.ttl ? moment(row.ttl).format('DD MMM YYYY') : '-',
            name: row.name || '-',
            hp: row.hp || '-',
            gender: row.gender || '-',
            created_at: moment(row.created_at).format('YYYY-MM-DD HH:mm'),
          }))}
          columns={columns}
        />
      )}
    </Container>
  );
}

export default AdminUser;
