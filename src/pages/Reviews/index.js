/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Container,
  Typography,
  Box,
  Avatar,
  Divider,
  Rating,
  Button,
  TextField,
} from '@mui/material';
import { Edit, Send, ShoppingBag } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { getUserReviews, putReview } from '../../utils';

function ReviewItem({ data, onSuccess }) {
  const { enqueueSnackbar } = useSnackbar();
  const [editState, setEditState] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [formState, setFormState] = useState({
    review: data.review,
    rating: data.rating,
  });

  const handleSubmit = async () => {
    setLoadingState(true);
    try {
      if (!formState.rating) {
        throw new Error('Rating tidak boleh kosong');
      }
      const dataReview = {
        id_item: data.id_item,
        review: formState.review,
        rating: formState.rating,
      };
      const review = await putReview(data.id_item_order, dataReview);
      setLoadingState(false);
      if (review.status !== 'success') {
        throw new Error(review.message);
      }
      onSuccess(review.data);
      setEditState(false);
    } catch (err) {
      setLoadingState(false);
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Box boxShadow="0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))" p={2}>
      <Box
        display="flex"
        gap={1.25}
        mb={1.8}
        justifyContent="space-between"
      >
        <Box display="flex" gap={1.25} alignItems="center">
          <ShoppingBag fontSize="small" sx={{ color: 'rgb(3, 172, 14)' }} />
          <Typography fontWeight={800} fontSize={12}>Belanja</Typography>
          <Typography fontSize={12} color="text.secondary">{moment(data.updated_at).format('DD MMM YYYY')}</Typography>
        </Box>
        { !editState && (
          <Button
            sx={{ fontSize: 12, fontWeight: 800 }}
            size="small"
            onClick={() => setEditState(true)}
            endIcon={<Edit />}
          >
            Ubah Ulasan
          </Button>
        )}
      </Box>
      <Typography fontSize={12} fontWeight={800} mb={1.25} textAlign={{ xs: 'left', sm: 'center', md: 'left' }}>{data.toko_name}</Typography>
      <Box display="flex" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={{ xs: 2, md: 4, lg: 8 }} flexDirection={{ xs: 'column', md: 'row' }}>
        <Box display="flex" gap={2} alignItems="center">
          <Avatar src={data.foto} variant="square" alt="baju muslim" sx={{ width: 60, height: 60, borderRadius: 1 }} />
          <Box>
            <Typography fontSize={14} fontWeight={800} gutterBottom>
              {data.name}
            </Typography>
            <Rating
              readOnly={!editState}
              value={formState.rating}
              onChange={(e, newValue) => setFormState({ ...formState, rating: newValue })}
            />
          </Box>
        </Box>
        <Divider orientation="vertical" sx={{ height: 50, display: { xs: 'none', md: 'block' } }} />
        <Box width="100%">
          <Typography fontSize={14} fontWeight={800}>Ulasan :</Typography>
          { !editState && (
            <Typography fontSize={14} component="pre" whiteSpace="pre-wrap" color="text.secondary">
              {data.review}
            </Typography>
          )}
          { editState && (
            <>
              <TextField
                fullWidth
                rows={2}
                multiline
                value={formState.review}
                onChange={(e) => setFormState({ ...formState, review: e.target.value })}
                sx={
                  {
                    '& textarea': {
                      fontSize: 14,
                    },
                  }
                }
              />
              <Box display="flex" justifyContent="flex-end">
                <Button
                  sx={{ fontSize: 12, fontWeight: 800 }}
                  size="small"
                  disabled={loadingState}
                  onClick={handleSubmit}
                  endIcon={<Send />}
                >
                  { loadingState ? 'Loading ...' : 'Kirim' }
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

function Reviews() {
  const [reviewsState, setReviewsState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchReviews = async () => {
    setReviewsState({ ...reviewsState, loading: true });
    try {
      const reviews = await getUserReviews();
      if (reviews.status !== 'success') {
        throw new Error(reviews.message);
      }
      setReviewsState({
        ...reviewsState,
        loading: false,
        data: reviews.data,
      });
    } catch (err) {
      setReviewsState({
        ...reviewsState,
        loading: false,
        message: err.message,
      });
    }
  };

  const handleSuccess = (data) => {
    setReviewsState((prevState) => ({
      ...prevState,
      data: prevState.data.map((row) => {
        if (
          (row.id_item_order === data.id_item_order)
            && (row.id_item === data.id_item)
        ) {
          return {
            ...row,
            rating: data.rating,
            review: data.review,
            updated_at: data.updated_at,
          };
        }
        return row;
      }),
    }));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Container>
      { reviewsState.loading && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { (!reviewsState.loading && reviewsState.message) && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">{reviewsState.message}</Typography>
        </Box>
      )}
      { (!reviewsState.loading && reviewsState.data) && (
        <>
          {reviewsState.data.length !== 0 && (
            <Box display="flex" flexDirection="column" gap={2}>
              {
                reviewsState.data.map((row) => (
                  <ReviewItem key={row.id_item} data={row} onSuccess={handleSuccess} />
                ))
              }
            </Box>
          )}
          {reviewsState.data.length === 0 && (
            <Box display="flex" justifyContent="center" py={6}>
              <Typography color="text.secondary">
                Tidak ada ulasan
              </Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default Reviews;
