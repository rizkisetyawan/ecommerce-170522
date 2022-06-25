/* eslint-disable no-bitwise */
import {
  Container, Grid, Box, Typography,
} from '@mui/material';
import Chart from 'react-apexcharts';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getTrxStatistics } from '../../utils';

function Statistics() {
  const identity = useSelector(({ auth }) => auth);
  const [statisticsState, setStatisticsState] = useState({
    loading: false,
    data: [],
    message: null,
  });

  const chart = {
    series: [{
      name: 'Total Transaksi',
      data: statisticsState.data.map((row) => +row.count),
    }],
    options: {
      chart: {
        height: 400,
        type: 'line',
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
        text: 'STATISTIK PENJUALAN BULAN INI',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: statisticsState.data.map((row) => moment(row.date).format('D MMM')),
      },
      yaxis: {
        labels: {
          formatter: (value) => value.toFixed(0),
        },
      },
    },
  };

  const fetchStatistics = async () => {
    setStatisticsState({ ...statisticsState, loading: true });
    try {
      const day = +moment().format('D') - 1;
      const idUmkm = identity.toko.id_umkm;
      const products = await getTrxStatistics(day, idUmkm);
      if (products.status !== 'success') {
        throw new Error(products.message);
      }
      setStatisticsState({
        ...statisticsState,
        loading: false,
        data: products.data,
      });
    } catch (err) {
      setStatisticsState({
        ...statisticsState,
        loading: false,
        message: err.message,
      });
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <Container>
      { statisticsState.loading && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { (!statisticsState.loading && statisticsState.message) && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">{statisticsState.message}</Typography>
        </Box>
      )}
      { (!statisticsState.loading && statisticsState.data) && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box>
              <Chart
                options={chart.options}
                series={chart.series}
                type="line"
                height={400}
                // width="100%"
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Statistics;
