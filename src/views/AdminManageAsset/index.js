import React, { useEffect } from 'react';
import { useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, Button,CircularProgress} from '@mui/material';
import TextField from '@mui/material/TextField';

//project import
// import SalesLineCard from './SalesLineCard';
// import SalesLineCardData from './chart/sale-chart-1';

//Ether
// import { ethers } from "ethers";

// import RevenuChartCard from './RevenuChartCard';
// import RevenuChartCardData from './chart/revenu-chart';
import ReportCard from './ReportCard';
import { gridSpacing } from 'config.js';

// assets
// import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MonetizationOnTwoTone from '@mui/icons-material/MonetizationOnTwoTone';
import ThumbUpAltTwoTone from '@mui/icons-material/ThumbUpAltTwoTone';
import Diversity1TwoToneIcon from '@mui/icons-material/Diversity1TwoTone';
//firebaseimport
import { findUser, getEthPrice } from '../../../src/firebase';
import { useUserAuth } from 'context/UserAuthContext';
import { search_familiy, search_all_user , invest_on_site } from '../../../src/firebase';
// custom style

// const FlatCardBlock = styled((props) => <Grid item sm={6} xs={12} {...props} />)(({ theme }) => ({
//   padding: '25px 25px',
//   borderLeft: '1px solid' + theme.palette.background.default,
//   [theme.breakpoints.down('sm')]: {
//     borderLeft: 'none',
//     borderBottom: '1px solid' + theme.palette.background.default
//   },
//   [theme.breakpoints.down('md')]: {
//     borderBottom: '1px solid' + theme.palette.background.default
//   }
// }));

// ==============================|| DASHBOARD DEFAULT ||============================== //


const Default = () => {
  const theme = useTheme();
  const { user } = useUserAuth();
  const [loggedUser, setloggedUser] = useState([]);
  const [my_friends, SearchFriend] = useState([]);
  const [all_friends, SearchFriends] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const [amount, setamount] = useState();

  console.log(all_friends);

  const [ethPrice, setEthPrice] = useState();

  const generate_eth_price = async () => {
    setEthPrice(await getEthPrice());
  };
 

  const Search_familiy = async () => {
    try {
      SearchFriend(await search_familiy(user));
    } catch (error) {
      console.log('Friend Searching Failed !');
    }
  };
  useEffect(() => {
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
  const handleSendCompundFin = ()=>{
    console.log(amount , "Hi :")
    invest_on_site(amount/ethPrice)
  }
  console.log("idhar nan",loggedUser)
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
              footerData={loggedUser.user_name === 'master' ? 'Total Invested on Communomy' : 'Invesments'}
              iconPrimary={MonetizationOnTwoTone}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={
                loggedUser.user_name === 'master'
                  ? parseFloat((loggedUser?.total_sent)*ethPrice).toFixed(2) + " $"
                  : parseFloat(loggedUser?.total_received_amount * ethPrice).toFixed(2) + ' $'
              }
              
              // primary={loggedUser?.total_received_amount}
              secondary={loggedUser.user_name === 'master' ? 'Money Sent' : 'Amount Recived'}
              color={theme.palette.primary.main}
              footerData={loggedUser.user_name === 'master' ? 'Total Money Sent To compund Finance' : 'Total Amount Recived'}
              iconPrimary={ThumbUpAltTwoTone}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={
                loggedUser.user_name === 'master'
                  ? (parseFloat((loggedUser?.total_money - loggedUser?.total_sent)  * ethPrice)).toFixed(2) + ' $'
                  : +(parseFloat(loggedUser?.total_received_amount * ethPrice) * 1.04).toFixed(2) + ' $'
              }
              secondary="Remaining"
              color={theme.palette.success.main}
              footerData="Money to be sent to Compund Finance"
              iconPrimary={MonetizationOnTwoTone}
              // iconFooter={TrendingDownIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={
                loggedUser.user_name === 'master'
                  ? (
                     ((parseFloat(loggedUser?.total_sent * ethPrice) * 1.04) - (parseFloat(loggedUser?.total_sent * ethPrice))).toFixed(4)+ " $"
                    )
                  : (
                      (parseFloat(loggedUser?.total_received_amount * ethPrice) * 1.04).toFixed(2) 
                    )
              }
              secondary="Interest"
              color={theme.palette.error.main}
              footerData={loggedUser.user_name ? 'Interest Earned on Compound Finance' : 'People in Your Community'}
              iconPrimary={Diversity1TwoToneIcon}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
        <Grid item lg={4} xs={12}>

        </Grid>

        
          <Grid item lg={4} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography component="div" className="card-header">
                    Invest on Compound Finanace 
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid item lg={12} align="center">
                  <TextField
                    variant="outlined"
                    value={amount}
                    fullWidth
                    margin="normal"
                    label="Amount to Invest on Compound Finance"
                    placeholder="Enter Amount"
                    onChange={(e) => setamount(e.target.value)}
                  />
                  <Button variant="contained" size="small" onClick={handleSendCompundFin} disabled={amount<=0?true:false}>
                    Invest
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
        </Grid>

      </Grid>
      <Grid item lg={12} xs={12}>
            <Card>
              <div style={{ overflow: 'hidden' }}>
                <iframe
                  id="embedded-website"
                  src="https://app.compound.finance/?market=usdc-mainnet" // Replace with the URL of the website you want to embed
                  title="Embedded Website"
                  width="100%"
                  frameBorder="0"
                  height="1200px"
                  style={{ border: 'none', margin: '0', padding: '0', width: '100%' }}
                />
              </div>
            </Card>
          </Grid>

      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader
                        title={
                          <Typography component="div" className="card-header">
                            Add Member
                          </Typography>
                        }
                      />
                      <Divider />
                      <CardContent>
                        <Grid item lg={12} align="center">
                          <TextField
                            variant="outlined"
                            // value={}
                            fullWidth
                            margin="normal"
                            label="Amount to Invest on Compound Finance"
                            placeholder="Enter Amount"
                            // onChange={(e) => setUserSearch(e.target.value)}
                          />
                          <Button variant="contained" size="small">
                            Invest
                          </Button>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sx={{ display: { md: 'block', sm: 'none' } }}>
                    <Card>
                      <CardContent sx={{ p: '0 !important' }}>
                        <Grid container alignItems="center" spacing={0}>
                          <FlatCardBlock>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <Typography variant="subtitle2" align="left">
                                  REALTY
                                </Typography>
                              </Grid>
                              <Grid item sm zeroMinWidth>
                                <Typography variant="h5" sx={{ color: theme.palette.error.main }} align="right">
                                  -0.99
                                </Typography>
                              </Grid>
                            </Grid>
                          </FlatCardBlock>
                          <FlatCardBlock>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <Typography variant="subtitle2" align="left">
                                  INFRA
                                </Typography>
                              </Grid>
                              <Grid item sm zeroMinWidth>
                                <Typography variant="h5" sx={{ color: theme.palette.success.main }} align="right">
                                  -7.66
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
              {/* <Grid item xs={12} sm={6}>
                <RevenuChartCard
                  chartData={RevenuChartCardData}
                  totat_inv={
                    loggedUser.user_name === 'master'
                      ? parseFloat(loggedUser?.total_money * ethPrice)
                      : parseFloat(loggedUser?.total_invested_amount * ethPrice).toFixed(4)
                  }
                  totat_rcv={
                    loggedUser.user_name === 'master'
                      ? parseFloat(loggedUser?.total_transaction * ethPrice)
                      : parseFloat(loggedUser?.total_received_amount * ethPrice).toFixed(4)
                  }
                  totat_ecp={
                    loggedUser.user_name === 'master'
                      ? (parseFloat(loggedUser?.total_money * ethPrice) * 1.04).toFixed(4)
                      : (parseFloat(loggedUser?.total_received_amount * ethPrice) * 1.04).toFixed(4)
                  }
                />
              </Grid> */}
      {/* </Grid>
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
                  {console.log('alldosy', all_friends)}
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
                                  (parseFloat(row.receivedamount * ethPrice).toFixed(4) /
                                    parseFloat(loggedUser?.total_money * ethPrice).toFixed(4)) *
                                    100
                                ).toFixed(2) + '%'}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <LinearProgress
                                variant="determinate"
                                aria-label="direct"
                                value={(parseFloat(row.receivedamount * ethPrice) / parseFloat(loggedUser?.total_money * ethPrice)) * 100}
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
                                (parseFloat(row.receivedamount * ethPrice).toFixed(4) /
                                  parseFloat(loggedUser?.total_invested_amount * ethPrice).toFixed(4)) *
                                  100
                              ).toFixed(2) + '%'}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <LinearProgress
                              variant="determinate"
                              aria-label="direct"
                              value={
                                (parseFloat(row.receivedamount * ethPrice) / parseFloat(loggedUser?.total_invested_amount * ethPrice)) * 100
                              }
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
      </Grid> */}
    </Grid>
  );
};

export default Default;
