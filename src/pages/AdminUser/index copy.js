/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Box,
  Avatar,
  Typography,
  Switch,
  Container,
} from '@mui/material';
import React, { useState, useEffect, useSearch } from 'react';
import moment from 'moment';
import {
  getAllUsers, putStatusProduct,
} from '../../utils';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function StatusSwitch({ id, isActive }) {
  const [checkedState, setCheckedState] = useState({
    isActive,
    loading: false,
    message: null,
  });

  const handleChecked = async (e) => {
    const { checked } = e.target;
    setCheckedState({ ...checkedState, loading: true });
    try {
      const product = await putStatusProduct(id, { status: checked ? 'aktif' : 'tidak aktif' });
      if (product.status !== 'success') {
        throw new Error(product.message);
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
    />
  );
}

function AdminUser() {
  const [pageState, setPageState] = useState(0);
  const [limitState, setLimitState] = useState(10);
  const [usersState, setUsersState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const handleChangePage = (event, newPage) => {
    fetchUsers(newPage, limitState);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchUsers(0, event.target.value);
  };

  const fetchUsers = async (page, limit) => {
    setUsersState({ ...usersState, loading: true });
    try {
      const users = await getAllUsers({ limit, page });
      if (users.status !== 'success') {
        throw new Error(users.message);
      }
      setUsersState({
        ...usersState,
        loading: false,
        data: users.data,
      });
      setPageState(users.data.page);
      setLimitState(limit);
    } catch (err) {
      setUsersState({
        ...usersState,
        loading: false,
        message: err.message,
      });
    }
  };

  useEffect(() => {
    fetchUsers(pageState, limitState);
  }, []);

  return (
    <Container>
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
        <Box sx={{ boxShadow: 'rgb(0 0 0 / 12%) 0px 1px 6px 0px' }}>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800 }}>Nama</TableCell>
                  <TableCell sx={{ fontWeight: 800 }} align="right">Email</TableCell>
                  <TableCell sx={{ fontWeight: 800 }} align="right">HP</TableCell>
                  <TableCell sx={{ fontWeight: 800 }} align="center">Gender</TableCell>
                  <TableCell sx={{ fontWeight: 800 }} align="right">Tanggal Lahir</TableCell>
                  <TableCell sx={{ fontWeight: 800 }} align="right">Updated</TableCell>
                  <TableCell sx={{ fontWeight: 800 }} align="right">Created</TableCell>
                  <TableCell sx={{ fontWeight: 800 }} align="center">Aktif</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersState.data.rows.map((row) => (
                  <TableRow
                    key={row.id_user}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box display="flex" gap={1.5} alignItems="center">
                        <Avatar
                          variant="square"
                          src={row.foto}
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1,
                          }}
                        />
                        <Typography fontSize={14} fontWeight={800} color="text.secondary">
                          {row.name || '-'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.hp || '-'}</TableCell>
                    <TableCell align="center">{row.gender || '-'}</TableCell>
                    <TableCell align="right">{row.ttl ? moment(row.ttl).format('DD MMM YYYY') : '-'}</TableCell>
                    <TableCell align="right">{row.updated_at ? moment(row.updated_at).format('YYYY-MM-DD HH:mm') : '-'}</TableCell>
                    <TableCell align="right">{row.created_at ? moment(row.created_at).format('YYYY-MM-DD HH:mm') : '-'}</TableCell>
                    <TableCell align="center">
                      <StatusSwitch
                        id={row.id_item}
                        isActive={row.status === 'aktif'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box borderTop={1} borderColor="divider">
            <TablePagination
              component="div"
              count={usersState.data.total}
              page={pageState}
              onPageChange={handleChangePage}
              rowsPerPage={limitState}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default AdminUser;
