/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import * as React from 'react';
import {
  Card, CardContent, CardActionArea, Typography, Box, Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CardToko({ data }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: '100%', boxShadow: 'rgb(0 0 0 / 12%) 0px 1px 6px 0px' }}>
      <CardActionArea onClick={() => navigate(`/toko/${data.id_umkm}`)}>
        <CardContent
          sx={{
            height: 90,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Avatar src={data.foto} />
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                fontWeight: 800,
              }}
            >
              {data.name}
            </Typography>
          </Box>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              fontSize: 13,
            }}
          >
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardToko;
