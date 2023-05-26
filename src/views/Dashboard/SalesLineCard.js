import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect , useState} from 'react';
import { useUserAuth } from 'context/UserAuthContext';
// third-party
import Chart from 'react-apexcharts';
import { getEthPriceDaily } from '../../../src/firebase';
// ==============================|| SALES LINE CARD ||============================== //

const SalesLineCard = ({ bgColor, footerData, icon, title, percentage }) => {
  const theme = useTheme();
  const [ethPriceArr , setEthPriceArr] = useState([])
  const { user } = useUserAuth();

  const generate_eth_price_arr = async () => {
    setEthPriceArr(await getEthPriceDaily());
  };
  useEffect(() => {
    generate_eth_price_arr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  let footerHtml; 


  const chartData = {
    type: 'line',
    height: 115,
    options: {
      chart: {
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#fff'],
  
      stroke: {
        curve: 'smooth',
        width: 3
      },
      yaxis: {
        min: 1750,
        max: 1900
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: () => 'Eth Price Per Day'
          }
        },
        marker: {
          show: true
        }
      }
    },
    series: [
      {
        name: 'APRs',
        data: ethPriceArr,
      }
    ]
  };


  if (footerData) {
    footerHtml = footerData.map((item, index) => {
      return (
        <Grid item key={index}>
          <Box mt={3} mb={3} p={1}>
            <Grid container direction="column" spacing={1} alignItems="center">
              <Typography variant="h4">{item.value}</Typography>
              <Typography variant="subtitle2" color="secondary">
                {item.label}
              </Typography>
            </Grid>
          </Box>
        </Grid>
      );
    });
  }

  return (
    <Card>
      <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
        <Box color="#fff" bgcolor={bgColor ? bgColor : theme.palette.primary.main} p={3}>
          <Grid container direction="column" spacing={1}>
            <Grid item container justifyContent="space-between" alignItems="center">
              {title && (
                <Grid item>
                  <Typography variant="subtitle1" color="inherit">
                    {title}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <Grid container alignItems="center">
                  {icon && (
                    <Box component="span" mr={2}>
                      {icon}
                    </Box>
                  )}
                  {percentage && (
                    <Typography variant="subtitle1" color="inherit">
                      {percentage}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            {chartData && (
              <Grid item>
                <Chart {...chartData} />
              </Grid>
            )}
          </Grid>
        </Box>
        {footerData && (
          <Grid container justifyContent="space-around" alignItems="center">
            {footerHtml}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

SalesLineCard.propTypes = {
  bgColor: PropTypes.string,
  chartData: PropTypes.object,
  footerData: PropTypes.array,
  icon: PropTypes.object,
  title: PropTypes.string,
  percentage: PropTypes.string
};

export default SalesLineCard;
