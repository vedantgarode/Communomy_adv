import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { useUserAuth } from 'context/UserAuthContext';
import { findUser, getEthPrice } from '../../firebase';
import { search_senttransact, search_admin_transact } from '../../firebase';
import moment from 'moment/moment';
import { CircularProgress } from '@mui/material';

const Sent_transcationTable = () => {
  const { user } = useUserAuth();
  const [Transactions, setTransactions] = useState();
  const [Transactions2, setTransactions2] = useState();
  const [ethPrice, setEthPrice] = useState();
  const [loading, setLoading] = useState(true); // Added loading state

  const generate_eth_price = async () => {
    setEthPrice(await getEthPrice());
  };

  // const printMyTransactions = async () => {
  //   try {
  //     if (user.displayName !== 'master') {
  //       const sender = await findUser(user.displayName.trim().toLowerCase());
  //       setTransactions(await search_senttransact(sender));
  //     } else {
  //       setTransactions(await search_admin_transact('master'));
  //     }
  //   } catch (error) {
  //     // Handle error
  //   }
  // };

  useEffect(() => {
    generate_eth_price();
    const printMyTransactions = async () => {
      try {
        if (user.displayName !== 'master') {
          const sender = await findUser(user.displayName.trim().toLowerCase());
          setTransactions(await search_senttransact(sender));
        } else {
          setTransactions(await search_admin_transact('master'));
        }
      } catch (error) {
        // Handle error
      }
    };
    printMyTransactions();
  }, [user]);

  useEffect(() => {
    if (!Transactions || !ethPrice) {
      return; // Return if data is not ready yet
    }

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
    setLoading(false); // Set loading state to false
  }, [Transactions, ethPrice]);

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
        display: false
      }
    }
  ];

  const options = {
    selectableRows: false,
    filterType: 'dropdown'
  };

  if (loading) {
    // Show loading indicator while loading
    return <CircularProgress />;
  }

  return <MUIDataTable data={Transactions2} columns={columns} options={options} />;
};

export default Sent_transcationTable;
