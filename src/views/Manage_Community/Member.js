import React from 'react';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';

// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


const Member = () => {
//   const [cointype, sentcointype] = useState();
//   const top100Films = ['Etherium', 'Polygon comming soon...', 'Bitcoin comming soon...'];

  return (
    <Box sx={{ flexDirection: 'column' ,justifyContent: 'left'}} display="flex" >
        Rushabh
      {/* <Grid item lg={6}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={cointype}
          onChange={(e, newValue) => {
            sentcointype(newValue);
          }}
          getOptionDisabled={(option) => option === top100Films[1] || option === top100Films[2]}
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Coin Type" />}
        />
      </Grid> */}
    </Box>
  );
};

export default Member;
