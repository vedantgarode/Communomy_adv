import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
// import Box from '@mui/material/Box';

const Member = () => {
  const [cointype, sentcointype] = useState();
  const top100Films = ['Etherium', 'Polygon comming soon...', 'Bitcoin comming soon...'];

  return (
    // <Box sx={{ margin: 1, justifyContent: 'center', flexDirection: 'column' }}>
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={cointype}
          onChange={(e, newValue) => {
            sentcointype(newValue);
          }}
          getOptionDisabled={(option) => option === top100Films[1] || option === top100Films[2]}
          options={top100Films}
          renderInput={(params) => <TextField {...params} label="Type User Name to Search" fullWidth />}
        />
      </Grid>
      <Grid item lg={12} align="center">
        <Button variant="contained">Add</Button>
      </Grid>
    </Grid>

    // </Box>
  );
};

export default Member;
