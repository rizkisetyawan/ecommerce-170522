/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Typography, Container, Grid,
  Card, CardContent, Avatar,
  Box, Rating,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';

import { getDashboard } from '../../utils';

function CardTotal({ title, count }) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ height: 150 }}>
        <Box height="100%" display="flex" flexDirection="column" justifyContent="space-evenly">
          <Typography fontSize={14} fontWeight={600}>
            {title}
          </Typography>
          <Typography fontSize={28} fontWeight={800} textAlign="center">
            {Intl.NumberFormat('id-ID').format(count)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function CardChart({ data, categories }) {
  const chart = {
    series: [{
      name: 'Total Transaksi',
      data,
    }],
    options: {
      chart: {
        height: 400,
        type: 'bar',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'STATISTIK PENJUALAN',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: { categories },
      yaxis: {
        labels: {
          formatter: (value) => value.toFixed(0),
        },
      },
    },
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <Chart
          options={chart.options}
          series={chart.series}
          type="bar"
          height={400}
        />
      </CardContent>
    </Card>
  );
}

function CardTopSelling({ data }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography mb={2} fontSize={14} fontWeight={600}>PRODUK TERLARIS</Typography>
          <Typography textAlign="right" fontSize={12} color="text.secondary">PENJUALAN</Typography>
        </Box>
        {data.map((row) => (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={{ xs: 2, md: 4 }}
            borderTop={1}
            borderColor="divider"
            pt={1}
            mb={1.2}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src={row.foto} variant="square" sx={{ width: 50, height: 50, borderRadius: 1 }} />
              <Box>
                <Typography fontSize={12} fontWeight={800} color="text.secondary">
                  {row.name_toko}
                </Typography>
                <Typography fontSize={{ xs: 12, sm: 14 }}>{row.name}</Typography>
                <Box display="flex" gap={1} alignItems="center">
                  <Rating value={+row.rating} size="small" readOnly />
                  <Typography textAlign="right" fontSize={14} color="success.main" fontWeight={800}>{row.rating}</Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography color="text.secondary" textAlign="right" fontWeight={800}>
                {Intl.NumberFormat('id-ID').format(+row.sold)}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

function AdminDashboard() {
  const [dashboardState, setDashboardState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchDashboard = async () => {
    setDashboardState({ ...dashboardState, loading: true });
    try {
      const products = await getDashboard();
      if (products.status !== 'success') {
        throw new Error(products.message);
      }
      setDashboardState({
        ...dashboardState,
        loading: false,
        data: products.data,
      });
    } catch (err) {
      setDashboardState({
        ...dashboardState,
        loading: false,
        message: err.message,
      });
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <Container sx={{ padding: '0 !important' }}>
      { dashboardState.loading && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { (!dashboardState.loading && dashboardState.message) && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">{dashboardState.message}</Typography>
        </Box>
      )}
      { (!dashboardState.loading && dashboardState.data) && (
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={6} md={3}>
            <CardTotal
              title="MENUNGGU PEMBAYARAN"
              count={dashboardState.data.counts.not_yet_paid}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <CardTotal
              title="TOTAL TRANSAKSI"
              count={dashboardState.data.counts.count_trx}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <CardTotal
              title="TOTAL USER"
              count={dashboardState.data.counts.count_user}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <CardTotal
              title="TOTAL PRODUK"
              count={dashboardState.data.counts.count_item}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardChart
              data={dashboardState.data.barTrx.map(({ count }) => count)}
              categories={dashboardState.data.barTrx.map(({ month }) => moment(month).format('MMM YYYY'))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardTopSelling data={dashboardState.data.topProduct} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default AdminDashboard;
