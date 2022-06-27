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

const chart = {
  series: [{
    name: 'Total Transaksi',
    data: [320, 581, 345],
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
      text: 'STATISTIK PENJUALAN TAHUN INI',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ['Jan 2022', 'Feb 2022', 'Mar 2022'],
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toFixed(0),
      },
    },
  },
};

function CardTotal({ title }) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ minHeight: 150 }}>
        <Typography fontSize={14} fontWeight={600}>
          {title}
        </Typography>
        <Typography mt={4} fontSize={20} fontWeight={800} textAlign="center">
          {Intl.NumberFormat('id-ID').format(2000)}
        </Typography>
      </CardContent>
    </Card>
  );
}

function CardChart() {
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

function CardTopSelling() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography mb={2} fontSize={14} fontWeight={600}>PRODUK TERLARIS</Typography>
        {[1, 2, 3, 4, 5].map((row) => (
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
              <Box><Typography fontWeight={600}>{row}</Typography></Box>
              <Avatar variant="square" sx={{ width: 50, height: 50, borderRadius: 1 }} />
              <Box>
                <Typography fontSize={14}>Lorem ipsum dolor sit amet.</Typography>
                <Rating size="small" />
              </Box>
            </Box>
            <Box
              display="flex"
              flexWrap="wrap"
              gap={1}
              alignItems="center"
              justifyContent="center"
            >
              {/* <Avatar sx={{ width: 30, height: 30, display: { xs: 'none', md: 'flex' } }} /> */}
              <Typography fontSize={12} color="text.secondary" textAlign="center">
                Toko mantappp
              </Typography>
            </Box>
            <Box>
              <Typography color="text.secondary" textAlign="right" fontWeight={800}>
                {Intl.NumberFormat('id-ID').format(2000)}
              </Typography>
              <Typography textAlign="right" fontSize={12} color="text.secondary">Penjualan</Typography>
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
            <CardTotal title="MENUNGGU PEMBAYARAN" />
          </Grid>
          <Grid item xs={6} md={3}>
            <CardTotal title="TOTAL TRANSAKSI" />
          </Grid>
          <Grid item xs={6} md={3}>
            <CardTotal title="TOTAL USER" />
          </Grid>
          <Grid item xs={6} md={3}>
            <CardTotal title="TOTAL PRODUK" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardTopSelling />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default AdminDashboard;
