import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography, useMediaQuery } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';
import value from 'assets/scss/_themes-vars.scss';

// ==============================|| REVENUE CHART CARD ||============================== //

const RevenuChartCard = ({ totat_inv, totat_rcv, totat_ecp }) => {
  const theme = useTheme();
  let o2 = {
    height: 50,

    dataLabels: {
      enabled: false
    },
    labels: ['Invested', 'Returns', 'Recived'],
    legend: {
      show: true,
      position: 'bottom',
      fontFamily: 'inherit',
      labels: {
        colors: 'inherit'
      }
    },
    itemMargin: {
      horizontal: 10,
      vertical: 10
    },
    colors: [value.warning, value.success, value.primary]
  };
  //console.log("data",totat_inv,totat_rcv,"totat_inv")
  let data = [parseFloat(totat_inv), parseFloat(totat_ecp), parseFloat(totat_rcv)];

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card>
      <CardHeader
        title={
          <Typography t="div" className="card-header">
            Amount Distribution
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2} direction={matchDownMd && !matchDownXs ? 'row' : 'column'}>
          <Grid item xs={12} sm={7} md={12}>
            {/* <Chart {...chartData} /> */}
            <Chart options={o2} series={data} type="donut" />
          </Grid>
          <Grid item sx={{ display: { md: 'block', sm: 'none' } }}>
            <Divider />
          </Grid>
          <Grid
            item
            container
            direction={matchDownMd && !matchDownXs ? 'column' : 'row'}
            justifyContent="space-around"
            alignItems="center"
            xs={12}
            sm={5}
            md={12}
          >
            <Grid item>
              <Grid container direction="column">
                <Typography variant="h6">Returns YoY</Typography>
                <Typography variant="subtitle1" sx={{ color: theme.palette.success.main }}>
                  + 3.5-6%
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Typography variant="h6">IBRR</Typography>
                <Box color={theme.palette.warning.main}>
                  <Typography variant="subtitle1" color="inherit">
                    {'~' + (totat_inv / totat_rcv).toFixed(2) * 100 + '%'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

RevenuChartCard.propTypes = {
  totat_inv: PropTypes.number,
  totat_rcv: PropTypes.number,
  totat_ecp: PropTypes.number
};

export default RevenuChartCard;
