import React, { useState ,useEffect } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useUserAuth } from 'context/UserAuthContext';
import { toast } from 'react-toastify';

import { findUser ,getEthPrice ,transact2} from '../../firebase';
// import { useNavigate } from 'react-router';

const AdminTranscation_Form = (props) => {
  const {row } = props;

  const [cointype, sentcointype] = useState();
  const [TError, setTError] = useState();
  // const navigate = useNavigate();

  const [ethPrice , setEthPrice] = useState()
  
  const generate_eth_price = async () => {
    setEthPrice(await getEthPrice());
  };

  const { user } = useUserAuth();
  useEffect(() => {
    generate_eth_price();
  }, [user]);
  const handleSendTranscation = async (e) => {
    e.preventDefault();

    //console.log(row);
    if (row < 0 || row === 0 || row === '' || row === undefined || row === null) {
      setTError('Enter Valid row !');
      //console.log('Transaction Failed !');
    } else {
      try {
        const user2 = await findUser("rushabh");
        const sender = await findUser(user.displayName.trim().toLowerCase());
        setTError(await transact2(sender.data(), user2.data(), row/ethPrice, cointype));
        toast.warning('Please wait to Confirm Transaction');
        console.log(TError,"TError")
        //console.log(user2.data(), sender.data());
      } catch (error) {
        setTError('Select Valid User !');
        console.log('Transaction Failed !', error);
        toast.error("errror"+error);
      }
    }
    // handleClickClose();
    // navigate('/send-transcations');
  };

  //   useEffect(() => {
  //     sentrow(0);
  //   });
  //console.log(row);
  const top100Films = ['Etherium', 'Polygon comming soon...', 'Bitcoin comming soon...'];
  //   //console.log("amt",row,"c",cointype)
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
                sentrow(e.target.value);
              }}
              label="Amount in USDT"
              variant="outlined"
              sx={{ marginTop: 3 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <TextField
              value={row / ethPrice}
              name="gst_number"
              fullWidth
              disabled = {true}
              label="Amount in Eth"
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
