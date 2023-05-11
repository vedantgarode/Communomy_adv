import React, { useState } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { toast } from "react-toastify";

const Transcation_Form = (props) => {
  const { handleClickClose, row } = props;
  const [amount, sentamount] = useState(0);
  const [cointype, sentcointype] = useState();
  const handleSendTranscation = () => {
    toast.success("Sumbited Successfully");
    console.log(amount, cointype);
  };

  //   useEffect(() => {
  //     sentamount(0);
  //   });
  console.log(row);
  const top100Films = ['Ethereum', 'Polygon comming soon...', 'Bitcoin comming soon...'];
  //   console.log("amt",amount,"c",cointype)
  return (
    <>
      <Box sx={{ margin: 1, justifyContent: 'center', flexDirection: 'column' }} display="flex">
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Autocomplete
              fullWidth
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
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <TextField
              value={amount}
              name="gst_number"
              fullWidth
              onChange={(e) => {
                sentamount(e.target.value);
              }}
              label="Amount"
              variant="outlined"
              sx={{ marginTop: 3 }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box container m={1} display="flex" justifyContent="center" alignItems="flex-end" sx={{ marginTop: 3 }}>
        <Button onClick={handleClickClose} variant="outlined" color="success">
          Send to {row}
        </Button>
        <Button onClick={handleSendTranscation} variant="outlined" color="success">
          Send to + {row}
        </Button>
      </Box>
    </>
  );
};

export default Transcation_Form;
