import { Container, Grid, Box } from '@mui/material';
import Chart from 'react-apexcharts';
import React from 'react';

const chart = {
  series: [{
    name: 'Desktops',
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
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
      text: 'Product Trends by Month',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  },
};

function Statistics() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
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
    </Container>
  );
}

export default Statistics;
