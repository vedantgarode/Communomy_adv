import React from 'react';
import { useState, useEffect } from 'react';
//mui
import MUIDataTable from 'mui-datatables';
import { Box } from '@mui/material';
//firebase
import { search_all_user } from '../../../src/firebase';
import { useUserAuth } from 'context/UserAuthContext';
import AdminSendTranscation from './AdminSendTranscation';
const AdminCommunityTable = () => {
  const { user } = useUserAuth();
  const [my_friends, SearchFriend] = useState([]);
  const [my_friends2, SearchFriend2] = useState([]);

  const Search_familiy = async () => {
    try {
      SearchFriend(await search_all_user(user));
      //SearchFriend(await search_all_user(user));
    } catch (error) {
      console.log('Friend Searching Failed !');
    }
  };
  useEffect(() => {
    Search_familiy();
  }, [user]);
  console.log('SearchFa', my_friends);

  useEffect(() => {
    const data = my_friends
      ?.filter((row) => row.name !== 'master')
      .map((row) => {
        return {
          name: row.name,
          receive: row.receivedamount,
          sent: row.receivedamount * 1.04,
          send: row.receivedamount * 1.04
        };
      });
    SearchFriend2(data);
  }, [my_friends]);

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
        customBodyRender: (value, dataIndex, rowIndex) => {
          console.log('da', value, dataIndex, rowIndex);
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
    filterType: 'dropdown'
  };
  return (
    <div style={{ boxSizing: 'content-box' }}>
      <MUIDataTable title={'Communomy Admin'} data={my_friends2} columns={columns} options={options} />
    </div>
  );
};

export default AdminCommunityTable;