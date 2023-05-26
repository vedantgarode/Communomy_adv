import React from 'react';
import { useState, useEffect } from 'react';
//mui
import MUIDataTable from 'mui-datatables';
import { Box ,CircularProgress} from '@mui/material';
//firebase
import { search_familiy , getEthPrice} from '../../../src/firebase';
import { useUserAuth } from 'context/UserAuthContext';
import SendTranscation from './sendTranscation';



const CommunityTable = () => {
  const { user } = useUserAuth();
  const [my_friends, SearchFriend] = useState([]);
  const [my_friends2, SearchFriend2] = useState([]);

  const [ethPrice , setEthPrice] = useState()
  
  const eth_price = async () => {
    setEthPrice(await getEthPrice()); 
  };
  const Search_familiy = async () => {
    try {
      eth_price();
      SearchFriend(await search_familiy(user));
      //SearchFriend(await search_all_user(user));
    } catch (error) {
      //console.log('Friend Searching Failed !');
      console.log(error)
    }
  };
  useEffect(() => {
    
    //console.log(ethPrice , "ethPrice")

    Search_familiy();
  }, [user]);
  //console.log('SearchFa', my_friends);

  useEffect(() => {
    const data = my_friends?.map((row) => {
      return {
        name: row.name,
        receive: (row.receivedamount * ethPrice ).toFixed(2),
        sent: (row.sentamount * ethPrice ).toFixed(2)  ,
        send: row.name
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
      label: 'Sent Amount ($)',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'sent',
      label: 'Received Amount ($)',
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
                <SendTranscation row={value} />
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
  if (ethPrice === undefined) {
    // Show loading state while fetching Ethereum price
    return <CircularProgress />;
  }
  return (
    <div style={{ boxSizing: 'content-box' }}>
      <MUIDataTable title={"Member"} data={my_friends2} columns={columns} options={options} />
    </div>
  );
};

export default CommunityTable;
