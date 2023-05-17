import React from 'react';
// import { Link } from 'react-router-dom';

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography, Box } from '@mui/material';

// project import
import Breadcrumb from 'component/Breadcrumb';
import CommunityTable from './CommunityTable';
import Member from './Member';

// ==============================|| SAMPLE PAGE ||============================== //

const Manage_Community = () => {
  return (
    <>
      <Breadcrumb title="Manage Your Community">
        {/* <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
            Manage
          </Typography>
          <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
            Sample Page
          </Typography> */}
      </Breadcrumb>
      <Grid container spacing="2">
        <Grid item xs={12} lg={8} sm={8} md={8} sx={{ p: 1 }}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header">
                  Community
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <CommunityTable />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4} sm={4} md={4} sx={{ p: 1 }}>
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
              <Box>
                <Member />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Manage_Community;
