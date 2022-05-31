/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import * as React from 'react';
import {
  Card, CardContent, CardMedia, CardActionArea, Typography, Rating, Box, Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Item({ imgUrl }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: '100%', boxShadow: 'rgb(0 0 0 / 12%) 0px 1px 6px 0px' }}>
      <CardActionArea onClick={() => navigate('product')}>
        <CardMedia
          component="img"
          height="180"
          image={imgUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            gutterBottom
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              '-webkit-line-clamp': '2',
              '-webkit-box-orient': 'vertical',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit quidem debitis perferendis totam doloribus sunt! Quos laborum commodi illo voluptates.
          </Typography>
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>
            Rp75.000
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.3 }}>
            <Rating defaultValue={1} max={1} size="small" readOnly />
            <Typography variant="subtitle2" color="textSecondary">4.8</Typography>
            <Divider sx={{ height: 20, mx: 1 }} orientation="vertical" />
            <Typography variant="subtitle2" color="textSecondary">Terjual 25</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Item;
