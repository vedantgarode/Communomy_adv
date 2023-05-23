import React, { useState } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useUserAuth } from 'context/UserAuthContext';
import { toast } from 'react-toastify';
import { transact } from '../../firebase';
import { findUser } from '../../firebase';
import { useNavigate } from 'react-router';

const AdminTranscation_Form = (props) => {
  const { handleClickClose, row } = props;
  const [amount, sentamount] = useState(0);
  const [cointype, sentcointype] = useState();
  const [TError, setTError] = useState();
  const navigate = useNavigate();

  const { user } = useUserAuth();

  const handleSendTranscation = async (e) => {
    e.preventDefault();

    console.log(amount);
    if (amount < 0 || amount === 0 || amount === '' || amount === undefined || amount === null) {
      setTError('Enter Valid Amount !');
      console.log('Transaction Failed !');
    } else {
      try {
        const user2 = await findUser(row);
        const sender = await findUser(user.displayName.trim().toLowerCase());
        setTError(await transact(sender.data(), user2.data(), amount, cointype));
        toast.success('Please wait to Confirm Transaction');

        console.log(user2.data(), sender.data());
      } catch (error) {
        setTError('Select Valid User !');
        console.log('Transaction Failed !', error);
        toast.error('error');
      }
    }
    handleClickClose();
    navigate('/send-transcations');
  };

  //   useEffect(() => {
  //     sentamount(0);
  //   });
  console.log(row);
  const top100Films = ['Etherium', 'Polygon comming soon...', 'Bitcoin comming soon...'];
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
              defaultValue={top100Films[0]}
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
              value={row}
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
        <Button onClick={handleSendTranscation} variant="outlined" color="success">
          Send : {row}
        </Button>
        {TError}
      </Box>
    </>
  );
};

export default AdminTranscation_Form;
