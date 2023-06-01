import React from 'react';
// import { Link } from 'react-router-dom';

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import Rcvd_transcationTable from './Rcvd_transcationTable';
// ==============================|| SAMPLE PAGE ||============================== //

const Rcvd_Transcations = () => {
  return (
    <>
      <Breadcrumb title="Recived Transcations">
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
                  Recived transcations
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Rcvd_transcationTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Rcvd_Transcations;
