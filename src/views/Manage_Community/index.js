import React from 'react';
// import { Link } from 'react-router-dom';

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import CommunityTable from './CommunityTable';

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
      <Grid container spacing={gridSpacing}>
        <Grid item>
          <Card></Card>
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
      </Grid>
    </>
  );
};

export default Manage_Community;
