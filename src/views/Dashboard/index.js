import React, { useEffect } from 'react';
import { useState } from 'react';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, LinearProgress ,CircularProgress} from '@mui/material';

//project import
import SalesLineCard from './SalesLineCard';
import SalesLineCardData from './chart/sale-chart-1';

//Ether 
// import { ethers } from "ethers";

import RevenuChartCard from './RevenuChartCard';
//import RevenuChartCardData from './chart/revenu-chart';
import ReportCard from './ReportCard';
import { gridSpacing } from 'config.js';

// assets
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MonetizationOnTwoTone from '@mui/icons-material/MonetizationOnTwoTone';
import ThumbUpAltTwoTone from '@mui/icons-material/ThumbUpAltTwoTone';
import Diversity1TwoToneIcon from '@mui/icons-material/Diversity1TwoTone';
//firebaseimport
import { findUser ,getEthPrice ,getEthPriceDaily } from '../../../src/firebase';
import { useUserAuth } from 'context/UserAuthContext';
import { search_familiy, search_all_user } from '../../../src/firebase';
// custom style

const FlatCardBlock = styled((props) => <Grid item sm={6} xs={12} {...props} />)(({ theme }) => ({
  padding: '25px 25px',
  borderLeft: '1px solid' + theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    borderLeft: 'none',
    borderBottom: '1px solid' + theme.palette.background.default
  },
  [theme.breakpoints.down('md')]: {
    borderBottom: '1px solid' + theme.palette.background.default
  }
}));

// ==============================|| DASHBOARD DEFAULT ||============================== //

const Default = () => {
  const theme = useTheme();
  const { user } = useUserAuth();
  const [loggedUser, setloggedUser] = useState([])  ;
  const [my_friends, SearchFriend] = useState([]);
  const [all_friends, SearchFriends] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  
  const [ethPrice , setEthPrice] = useState()
  const [ethPriceArr , setEthPriceArr] = useState([])

  const generate_eth_price_arr = async () => {
    setEthPriceArr(await getEthPriceDaily());
  };
  
  const generate_eth_price = async () => {
    setEthPrice(await getEthPrice());
  };
 console.log("etherbhaarkaaarrya",ethPriceArr)

  const Search_familiy = async () => {
    try {
      SearchFriend(await search_familiy(user));
    } catch (error) {
      console.log('Friend Searching Failed !');
    }
  };
  useEffect(() => {
    generate_eth_price_arr();
    console.log(ethPriceArr,"yytt");
    generate_eth_price();
    Search_familiy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const All_familiy = async () => {
    try {
      if (user.displayName === 'master') {
        SearchFriends(await search_all_user(user));
      }
    } catch (error) {
      console.log('Friend Searching Failed !');
    }
  };
  useEffect(() => {
    All_familiy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  console.log('Das', my_friends.length);
  // let Community_total =0
  // my_friends.forEach(element => {
  // });

  const my_info = async () => {
    try {
      if (user && user.displayName) {
        setloggedUser((await findUser(user.displayName))?.data());
      }
    } catch (error) {
      console.log('No user Found !', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    my_info();
  }, [user]);

  if (loading) {
    return <CircularProgress />;
  }
  console.log('loff', loggedUser, user.displayName);
  return (
    <Grid container spacing={gridSpacing}>
          

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} sm={6} xs={12}>

            <ReportCard
              primary={
                loggedUser.user_name === 'master'
                  ? parseFloat(loggedUser?.total_money * ethPrice).toFixed(2) + ' $'
                  : parseFloat(loggedUser?.total_invested_amount * ethPrice).toFixed(2) + ' $'
              }
              secondary="Invested Amount"
              color={theme.palette.warning.main}
              footerData={loggedUser.user_name === 'master' ? 'Total Invested' : 'Invesments'}
              iconPrimary={MonetizationOnTwoTone}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
              primary={
                loggedUser.user_name === 'master'
                  ? parseFloat(loggedUser?.total_transaction )
                  : parseFloat(loggedUser?.total_received_amount * ethPrice).toFixed(2) + ' $'
              }
              // primary={loggedUser?.total_received_amount}
              secondary={loggedUser.user_name === 'master' ? 'Transcations' : 'Amount Recived'}
              color={theme.palette.primary.main}
              footerData={loggedUser.user_name === 'master' ? 'Total Transcations' : 'Total Amount Recived'}
              iconPrimary={ThumbUpAltTwoTone}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
              primary={
                loggedUser.user_name === 'master'
                  ? (parseFloat(loggedUser?.total_money * ethPrice) * 1.04).toFixed(2) + ' $'
                  : +(parseFloat(loggedUser?.total_received_amount * ethPrice) * 1.04).toFixed(2) + ' $'
              }
              secondary="Expected Returns"
              color={theme.palette.success.main}
              footerData="Expected Returns YoY"
              iconPrimary={MonetizationOnTwoTone}
              // iconFooter={TrendingDownIcon}
            />

          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={loggedUser.user_name === 'master' ? 
              ((parseFloat(loggedUser?.total_money * ethPrice) * 1.04).toFixed(2)-(parseFloat(loggedUser?.total_money * ethPrice) * 1).toFixed(2)).toFixed(2) + ' $'
              :
              ((parseFloat(loggedUser?.total_received_amount * ethPrice) * 1.04).toFixed(2) -(parseFloat(loggedUser?.total_received_amount * ethPrice)).toFixed(2) * 1).toFixed(2) + ' $'
            }
              secondary="Earnings"
              color={theme.palette.error.main}
              footerData={loggedUser.user_name==="master" ? 'Earned by Communomy' : 'My Earnings'}
              iconPrimary={Diversity1TwoToneIcon}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <SalesLineCard
                      chartData={SalesLineCardData}
                      // arraydata={ethPriceArr}
                      title="Total Assets"
                      percentage="3% "
                      icon={<TrendingDownIcon />}
                      footerData={[
                        {
                          value: loggedUser?.total_received_amount * ethPrice + " $",
                          label: 'Total Asset '
                        },
                        {
                          value: (parseFloat(loggedUser?.total_received_amount *ethPrice) * 1.04).toFixed(2) + ' $',
                          label: 'Expected Return'
                        }
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: { md: 'block', sm: 'none' } }}>
                    <Card>
                      <CardContent sx={{ p: '0 !important' }}>
                        <Grid container alignItems="center" spacing={0}>
                          <FlatCardBlock>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <Typography variant="subtitle2" align="left">
                                  ETH :
                                </Typography>
                              </Grid>
                              <Grid item sm zeroMinWidth>
                                <Typography variant="h5" sx={{ color: theme.palette.error.main }} align="right">
                                  {ethPrice}
                                </Typography>
                              </Grid>
                            </Grid>
                          </FlatCardBlock>
                          <FlatCardBlock>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <Typography variant="subtitle2" align="left">
                                  24 Hr Change
                                </Typography>
                              </Grid>
                              <Grid item sm zeroMinWidth>
                                <Typography variant="h5"  align="right">
                                  {parseFloat(((ethPriceArr[5] - ethPriceArr[4])/ethPriceArr[5])*100).toFixed(2)+"%"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </FlatCardBlock>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RevenuChartCard
                  // chartData={RevenuChartCardData}
                  totat_inv={
                    loggedUser.user_name === 'master'
                      ? parseFloat(loggedUser?.total_money *ethPrice)
                      : parseFloat(loggedUser?.total_invested_amount *ethPrice).toFixed(4)
                  }
                  totat_rcv={
                    loggedUser.user_name === 'master'
                      ? parseFloat(loggedUser?.total_transaction * ethPrice)
                      : parseFloat(loggedUser?.total_received_amount *ethPrice ).toFixed(4)
                  }
                  totat_ecp={
                    loggedUser.user_name === 'master'
                      ? (parseFloat(loggedUser?.total_money * ethPrice) * 1.04).toFixed(4)
                      : (parseFloat(loggedUser?.total_received_amount * ethPrice) * 1.04).toFixed(4)
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography component="div" className="card-header">
                    Contributions
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={gridSpacing}>
                  {console.log("alldosy",all_friends)}
                  {all_friends?.map((row) => {
                    if (row.name !== 'master') {
                      return (
                        <Grid item xs={12} key={row.name}>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item sm zeroMinWidth>
                              <Typography variant="body2">{row?.name}</Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body2" align="right">
                                {parseFloat(
                                  (parseFloat(row.receivedamount * ethPrice).toFixed(4) / parseFloat(loggedUser?.total_money *ethPrice).toFixed(4)) *
                                    100
                                ).toFixed(2) + '%'}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <LinearProgress
                                variant="determinate"
                                aria-label="direct"
                                value={(parseFloat(row.receivedamount * ethPrice) / parseFloat(loggedUser?.total_money *ethPrice)) * 100}
                                color="primary"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    }
                  })}
                  {my_friends?.map((row) => {
                    return (
                      <Grid item xs={12} key={row.name}>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item sm zeroMinWidth>
                            <Typography variant="body2">{row?.name}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" align="right">
                              {parseFloat(
                                (parseFloat(row.receivedamount * ethPrice).toFixed(4) / parseFloat(loggedUser?.total_invested_amount *ethPrice).toFixed(4)) * 100
                              ).toFixed(2) + '%'}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <LinearProgress
                              variant="determinate"
                              aria-label="direct"
                              value={(parseFloat(row.receivedamount *ethPrice) / parseFloat(loggedUser?.total_invested_amount *ethPrice)) * 100}
                              color="primary"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Default;
