/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { Delete, Edit } from '@mui/icons-material';
import moment from 'moment';
import {
  Container,
  Box,
  Button,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { DataGrid } from '@mui/x-data-grid';
import { DialogCreateCategory } from '../../components';
import { deleteCategory, getCategory } from '../../utils';

function DeleteButton({ name, onSuccess, enqueueSnackbar }) {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteCategory = async () => {
    try {
      setLoadingDelete(true);
      const categories = await deleteCategory(name);
      if (categories.status !== 'success') {
        throw new Error(categories.message);
      }
      setLoadingDelete(false);
      onSuccess();
    } catch (err) {
      setLoadingDelete(false);
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Box display="flex" alignItems="center">
      { loadingDelete && <Typography color="text.secondary" fontSize={10}>Loading..</Typography>}
      { !loadingDelete && (
        <Tooltip title="Hapus">
          <IconButton
            aria-label="delete category"
            component="span"
            size="small"
            onClick={handleDeleteCategory}
          >
            <Delete size="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

function Category() {
  const { enqueueSnackbar } = useSnackbar();
  const [openDialogCategory, setOpenDialogCategory] = useState({
    action: null,
    open: false,
    data: null,
  });

  const [categoriesState, setCategoriesState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchCategories = async (withLoading = true) => {
    if (withLoading) {
      setCategoriesState({ ...categoriesState, loading: true });
    }
    try {
      const categories = await getCategory();
      if (categories.status !== 'success') {
        throw new Error(categories.message);
      }
      setCategoriesState({
        ...categoriesState,
        loading: false,
        data: categories.data,
      });
    } catch (err) {
      setCategoriesState({
        ...categoriesState,
        loading: false,
        message: err.message,
      });
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const handleSuccess = async (data) => {
    setCategoriesState({
      ...categoriesState,
      data: categoriesState.data.map((row) => {
        if (row.name === data.name) {
          return {
            ...row,
            foto: data.foto,
          };
        }
        return row;
      }),
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const columns = [
    {
      field: 'foto',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      width: 70,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => <Avatar src={params.row.foto} sx={{ borderRadius: 1 }} variant="square" />,
    },
    {
      field: 'name',
      headerName: 'Kategori',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => <Typography fontSize={14} textTransform="capitalize">{params.row.name}</Typography>,
    },
    {
      field: 'editable',
      headerName: '',
      minWidth: 70,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Tooltip title="ubah">
            <IconButton
              color="primary"
              aria-label="edit category"
              component="span"
              size="small"
              onClick={() => setOpenDialogCategory({ open: true, data: params.row, action: 'edit' })}
            >
              <Edit size="small" />
            </IconButton>
          </Tooltip>
          <DeleteButton
            name={params.row.name}
            enqueueSnackbar={enqueueSnackbar}
            onSuccess={() => {
              setCategoriesState({
                ...categoriesState,
                data: categoriesState.data.filter((row) => row.name !== params.row.name),
              });
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <Container sx={{ padding: '0 !important' }}>
      {
        categoriesState.loading && (
          <Box display="grid" justifyContent="center" p={6}>
            <Typography>Loading ...</Typography>
          </Box>
        )
      }
      {
        (!categoriesState.loading && categoriesState.message) && (
          <Box display="grid" justifyContent="center" p={6}>
            <Typography>{categoriesState.message}</Typography>
          </Box>
        )
      }
      {
        (!categoriesState.loading && categoriesState.data) && (
          <Box height={500}>
            <DataGrid
              rows={categoriesState.data.map((row) => ({
                ...row,
                id: row.name,
                editable: true,
                created_at: moment(row.created_at).format('YYYY-MM-DD HH:mm'),
              }))}
              columns={columns}
              hideFooter
            />
            <Button
              onClick={() => setOpenDialogCategory({ open: true, data: null, action: 'add' })}
              variant="contained"
              sx={{
                fontSize: 14,
                textTransform: 'capitalize',
                fontWeight: 800,
                mt: 2,
              }}
            >
              Tambah Kategori
            </Button>
          </Box>
        )
      }
      <DialogCreateCategory
        open={openDialogCategory.open}
        data={openDialogCategory.data}
        action={openDialogCategory.action}
        onSuccess={openDialogCategory.action === 'edit' ? handleSuccess : fetchCategories}
        onClose={() => setOpenDialogCategory({ open: false, data: null, action: null })}
      />
    </Container>
  );
}

export default Category;
