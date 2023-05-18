import React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { findUser, add_familiy } from '../../firebase';
import { useUserAuth } from 'context/UserAuthContext';
import { toast } from 'react-toastify';
// import Box from '@mui/material/Box';

const Member = () => {
  const [userSearch, setUserSearch] = useState('');
  const [user_search_metamask, setUserSearchMetamask] = useState('');
  const [user_search_bid, setUserSearchBID] = useState('');
  const [userSearchResult, setUserSearchResult] = useState('');
  const [frnd_added, setFriend] = useState('');
  const { user } = useUserAuth();
  const [flag_toview, setFlag_view] = useState(false);
  const [btn, setbtn] = useState(true);
  const find = async (e) => {
    setUserSearchResult(userSearch);
    e.preventDefault();
    setFlag_view(true);
    try {
      const user2 = await findUser(userSearch.trim().toLowerCase());
      //console.log(user2);
      setUserSearchBID(user2.data().BID);
      setUserSearchMetamask(user2.data().metamask);
      setbtn(false);
    } catch (error) {
      setUserSearchBID('No User Found !');
      setUserSearchMetamask('No User Found !');
      setbtn(true);
      console.log('No user Found !');
      console.log(error);
    }
  };
  const Add_familiy = async (e) => {
    e.preventDefault();
    try {
      const user2 = await findUser(userSearch.trim().toLowerCase());
      setFriend(await add_familiy(user, user2.data(), userSearch.trim().toLowerCase()));
      toast.success(`${userSearchResult} Added to Your Community`)
    } catch (error) {
      console.log('Friend addition Failed !');
      console.log(error);
    }
  };

  return (
    // <Box sx={{ margin: 1, justifyContent: 'center', flexDirection: 'column' }}>
    <Grid container spacing={1}>
      <Grid item lg={12}>
        <TextField
          variant="outlined"
          value={userSearch}
          fullWidth
          margin="normal"
          label="User Name to search"
          placeholder="User Name to search"
          onChange={(e) => setUserSearch(e.target.value)}
        />
      </Grid>
      {flag_toview && (
        <>
          {console.log(userSearchResult)}
          <Grid item lg={12}>
            <TextField
              variant="outlined"
              value={user_search_bid}
              fullWidth
              margin="normal"
              label="User Name to search"
              placeholder="User Name to search"
              disabled
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              variant="outlined"
              value={user_search_metamask}
              fullWidth
              margin="normal"
              label="User Name to search"
              placeholder="User Name to search"
              disabled
            />
          </Grid>
        </>
      )}

      <Grid item lg={12} align="center">
        <Button variant="outlined" onClick={find}>
          Search
        </Button>
      </Grid>
      <Grid item lg={12} align="center">
        {console.log('Button', btn)}
        <Button variant="contained" disabled={btn} onClick={Add_familiy}>
          Add {userSearchResult} to Community
        </Button>
        {frnd_added}
      </Grid>
    </Grid>

    // </Box>
  );
};

export default Member;
