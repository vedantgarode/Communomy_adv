import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Box, CircularProgress } from '@mui/material';
import { search_all_user, getEthPrice } from '../../../src/firebase';
import { useUserAuth } from 'context/UserAuthContext';
import AdminSendTranscation from './AdminSendTranscation';

const AdminCommunityTable = () => {
  const { user } = useUserAuth();
  const [my_friends, setMyFriends] = useState([]);
  const [my_friends2, setMyFriends2] = useState([]);
  const [ethPrice, setEthPrice] = useState(null); // Set initial value as null

  const generate_eth_price = async () => {
    try {
      const price = await getEthPrice();
      setEthPrice(price);
    } catch (error) {
      setEthPrice(1852);
    }
  };

  const Search_familiy = async () => {
    try {
      const friends = await search_all_user(user);
      setMyFriends(friends);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    generate_eth_price();
    Search_familiy();
  }, [user]);

  useEffect(() => {
    if (my_friends.length === 0 || ethPrice === null) {
      return; // Return if data is not ready yet
    }

    const data = my_friends
      .filter((row) => row.name !== 'master')
      .map((row) => {
        return {
          name: row.name,
          receive: (row.receivedamount * ethPrice )-((row.usereturn-row.userearning)*ethPrice),
          // receive: (row.receivedamount)-((row.usereturn-row.userearning)),
          sent: ((row.receivedamount * ethPrice )-((row.usereturn-row.userearning)*ethPrice)) * 1.04 ,
          send: ((row.receivedamount * ethPrice )-((row.usereturn-row.userearning)*ethPrice)) * 1.04 ,
        };
      });

    setMyFriends2(data);
  }, [my_friends, ethPrice]);

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'receive',
      label: 'Receive Amount',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'sent',
      label: 'Sent Amount',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'send',
      label: 'Send',
      options: {
        customBodyRender: (value) => {
          //console.log('da', value, dataIndex, rowIndex);
          return (
            <>
              <Box textAlign="center" display="flex">
                <AdminSendTranscation row={value} />
              </Box>
            </>
          );
        }
      }
    }
  ];

  const options = {
    selectableRows: false,
    filterType: 'dropdown',
  };

  if (ethPrice === null) {
    // Show loading state while fetching Ethereum price
    return <CircularProgress />;
  }

  return (
    <div style={{ boxSizing: 'content-box' }}>
      <MUIDataTable
        title={'Communomy Admin'}
        data={my_friends2}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default AdminCommunityTable;
