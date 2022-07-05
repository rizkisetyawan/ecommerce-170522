/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import * as React from 'react';
import {
  Card, CardContent, CardMedia, CardActionArea, Typography, Rating, Box, Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { rp } from '../../utils';

function CardProduct({ data }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: '100%', boxShadow: 'rgb(0 0 0 / 12%) 0px 1px 6px 0px' }}>
      <CardActionArea onClick={() => navigate(`/product/${data.id_item}`)}>
        <CardMedia
          component="img"
          height="180"
          image={data.foto}
        />
        <CardContent
          sx={{
            height: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <Typography
            variant="subtitle2"
            color="textSecondary"
            gutterBottom
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {data.name}
          </Typography>
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>
            {rp(data.price)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.3 }}>
            <Rating precision={0.5} defaultValue={1} max={1} size="small" readOnly />
            <Typography variant="subtitle2" color="textSecondary">{data.rating ? +data.rating.toFixed(1) : 0}</Typography>
            <Divider sx={{ height: 20, mx: 1 }} orientation="vertical" />
            <Typography variant="subtitle2" color="textSecondary">
              Terjual
              {' '}
              {data.sold}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardProduct;
