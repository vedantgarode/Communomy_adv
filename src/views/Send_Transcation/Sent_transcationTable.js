import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { useUserAuth } from 'context/UserAuthContext';
import { findUser ,getEthPrice } from '../../firebase';
import { search_senttransact } from '../../firebase';
import moment from 'moment/moment';

const Sent_transcationTable = () => {
  const { user } = useUserAuth();
  const [Transactions, setTransactions] = useState();
  const [Transactions2, setTransactions2] = useState();
  const [ethPrice , setEthPrice] = useState()
  
  const generate_eth_price = async () => {
    setEthPrice(await getEthPrice());
  };
  //   const columns = ['Recived By', 'Amount', 'Date and Time', 'Transcation ID'];
  const columns = [
    {
      name: 'sent',
      label: 'From',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'rcvd',
      label: 'To',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'eth',
      label: 'Eth',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'amt',
      label: 'Amount ($)',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'dt_Time',
      label: 'Date And Time',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'txid',
      label: 'Transaction ID',
      options: {
        filter: true,
        sort: false,
        display:false
    
      }
    }
  ];

//   const data = [
//     ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
//     ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
//     ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
//     ['James Houston', 'Test Corp', 'Dallas', 'TX']
//   ];

  const options = {
    selectableRows: false,
    filterType: 'dropdown'
  };
  const printMyTransactions = async () => {
    console.log(ethPrice)
    try {
      const sender = await findUser(user.displayName.trim().toLowerCase());
      setTransactions(await search_senttransact(sender));
    } catch (error) {
      //console.log('Transaction Searching Failed !', error);
    }
  };
  useEffect(() => {
    generate_eth_price();
  });
  
  useEffect(() => {
    printMyTransactions();
    
  }, [user]);

  useEffect(() => {
    const data = Transactions?.map((row) => {
      return {
        sent: row.sender,
        rcvd: row.receiver,
        eth: row.amount,
        amt: row.amount * ethPrice,
        dt_Time: moment(row.time).format('MMMM Do YYYY, h:mm:ss a'),
        txid: row.transaction_id    
      };
    });
    setTransactions2(data);
  }, [Transactions]);
  //console.log('yx', Transactions);

  return <MUIDataTable data={Transactions2} columns={columns} options={options} />;
};

export default Sent_transcationTable;
