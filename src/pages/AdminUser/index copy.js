/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Box,
  Button,
  Avatar,
  Typography,
  Switch,
  TextField,
  InputAdornment,
  Grid,
  Pagination,
  Stack,
  TableFooter,
} from '@mui/material';
import React, { useState } from 'react';
import { getProductsUmkm, putStatusProduct, rp } from '../../utils';

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
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box>
      <TableContainer component={Paper} sx={{ boxShadow: 'rgb(0 0 0 / 12%) 0px 1px 6px 0px' }}>
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
            {[
              {
                name: 'Rizki Setyawan',
                email: 'rizki@gmail.com',
                hp: '081212071870',
                foto: '',
                ttl: '05 September 1994',
                gender: 'pria',
                status: 'aktif',
                updated_at: '2022-07-23 15:00',
                created_at: '2022-07-23 15:00',
              },
              {
                name: 'Rizki Setyawan',
                email: 'rizki@gmail.com',
                hp: '081212071870',
                foto: '',
                ttl: '05 September 1994',
                gender: 'pria',
                status: 'aktif',
                updated_at: '2022-07-23 15:00',
                created_at: '2022-07-23 15:00',
              },
              {
                name: 'Rizki Setyawan',
                email: 'rizki@gmail.com',
                hp: '081212071870',
                foto: '',
                ttl: '05 September 1994',
                gender: 'pria',
                status: 'aktif',
                updated_at: '2022-07-23 15:00',
                created_at: '2022-07-23 15:00',
              },
            ].map((row) => (
              <TableRow
                key={row.name}
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
                      {row.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.hp}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="right">{row.ttl}</TableCell>
                <TableCell align="right">{row.updated_at}</TableCell>
                <TableCell align="right">{row.created_at}</TableCell>
                <TableCell align="center">
                  <StatusSwitch
                    id={row.id_item}
                    isActive={row.status === 'aktif'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminUser;
