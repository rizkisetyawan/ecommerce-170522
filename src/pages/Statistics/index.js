/* eslint-disable no-bitwise */
import 'rsuite/dist/rsuite.min.css';
import {
  Container, Grid, Box, Typography,
} from '@mui/material';
import Chart from 'react-apexcharts';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DateRangePicker } from 'rsuite';
import moment from 'moment';
import { getTrxStatistics2 } from '../../utils';

function Statistics() {
  const identity = useSelector(({ auth }) => auth);
  const [statisticsState, setStatisticsState] = useState({
    loading: false,
    data: [],
    message: null,
  });
  const [dateState, setDateState] = useState([
    new Date(moment().subtract(7, 'd').format('YYYY-MM-DD')),
    new Date(moment().format('YYYY-MM-DD')),
  ]);

  const chart = {
    series: [{
      name: 'Total Transaksi',
      data: statisticsState.data.map((row) => +row.count),
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
      // title: {
      //   text: 'STATISTIK PENJUALAN',
      //   align: 'left',
      // },
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

  const fetchStatistics = async (startDate, endDate) => {
    setStatisticsState({ ...statisticsState, loading: true });
    try {
      const idUmkm = identity.toko.id_umkm;
      const products = await getTrxStatistics2(
        idUmkm,
        moment(startDate).format('YYYY-MM-DD'),
        moment(endDate).format('YYYY-MM-DD'),
      );
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
    fetchStatistics(dateState[0], dateState[1]);
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <center>
            <Typography fontWeight={800} gutterBottom>STATISTIK PENJUALAN</Typography>
            <DateRangePicker
              value={dateState}
              onChange={(range) => setDateState(range)}
              onOk={(val) => fetchStatistics(val[0], val[1])}
            />
          </center>
        </Grid>
        <Grid item xs={12}>
          { (!statisticsState.loading && statisticsState.data) && (
            <Box>
              <Chart
                options={chart.options}
                series={chart.series}
                type="bar"
                height={400}
                // width="100%"
              />
            </Box>
          )}
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default Statistics;
