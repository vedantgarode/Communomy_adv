import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { ethers } from "ethers";
import { doc, getFirestore, getDoc, getDocs, collection, updateDoc, setDoc, where, query, orderBy } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDz2MWbf5xqGdvjbVLgJD0vHK4l7qq18IM',
  authDomain: 'communomyadv.firebaseapp.com',
  projectId: 'communomyadv',
  storageBucket: 'communomyadv.appspot.com',
  messagingSenderId: '577080900041',
  appId: '1:577080900041:web:5a3c3fc8f116f931861018',
  measurementId: 'G-Q460RF8W7R'
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

// export const compound_account = async () => {
//   const comet = new ethers.Contract(contractAddress, abiJson, provider);
//   //const [ principal, baseTrackingIndex, baseTrackingAccrued, assetsIn ] = await comet.callStatic.userBasic('0x9255153815a9948d44e6F121A11deD4b4823a3d9');
//   //console.log(comet);
// };

//Code For Finding User
import axios from 'axios';



export const getEthPriceDaily = async()  => {
  
    const data1 = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart', {
      params: {
        vs_currency: 'usd',
        days: 5,
        interval: 'daily'
      }
      })
    // Extracting daily prices
    const dailyPrices = data1.data.prices.map(price => price[1]);
    //console.log("rj",dailyPrices)
    return dailyPrices;
 
}
export const getEthPrice = async()  => {
  let ethereumPriceUSD = 0;

  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
  const daa= await axios.get(url);

  const jsonData = daa.data;
  ethereumPriceUSD = jsonData.ethereum.usd ;
  return ethereumPriceUSD;
    
  };







export const findUser = async (user_name) => {
  const docRef = doc(db, '/users_search', user_name);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap;
  } else {
    //console.log('No such document!');
    return false;
  }
};

//All users Array
export const search_all_user = async () => {
  let family = [];
  try {
    const querySnapshot = await getDocs(collection(db, '/users_search'));
    //console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      const person = {
        name: doc.data().user_name,
        bid: doc.data().BID,
        receivedamount: doc.data().total_received_amount,
        userearning:doc.data().my_earnings,
        usereturn:doc.data().my_return
      };
      family.push(person);
      //console.log("All USer :" ,family);
      //console.log(person);
    });
  } catch (e) {
    //console.log(e);
  }
  return family;
};

//Family Community Friends
//SearchFamily
export const search_familiy = async (user) => {
  let family = [];
  try {
    const querySnapshot = await getDocs(collection(db, '/users_search/' + user.displayName + '/my_family'));
    //console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      const person = {
        name: doc.data().Name,
        receivedamount: doc.data().received_amount,
        sentamount: doc.data().sent_amount,
        bid: doc.data().BID
      };
      family.push(person);
      // //console.log(family);
      //console.log(person);
    });
  } catch (e) {
    //console.log(e);
  }
  return family;
};
//add kr family
export const add_familiy = async (user1, user2, u2Name) => {
  const DocRef = collection(db, '/users_search/' + user1.displayName + '/my_family');
  const Doc2Ref = collection(db, '/users_search/' + user2.user_name + '/my_family');
  const FrndRef = doc(db, '/users_search/' + user1.displayName + '/my_family', u2Name);
  const docSnap = await getDoc(FrndRef);

  if (docSnap.exists()) {
    return 'User   Friend !';
  } else {
    if (user1.uid === user2.BID) {
      return 'Cannot Add Yorself';
    }
    await setDoc(doc(DocRef, u2Name), {
      Name: u2Name,
      BID: user2.BID,
      received_amount: 0,
      sent_amount: 0
    });
    await setDoc(doc(Doc2Ref, user1.displayName), {
      Name: user1.displayName,
      BID: user1.uid,
      received_amount: 0,
      sent_amount: 0
    });
    return 'User Added !';
  }
};
//Admin T

export const transact2 = async (user1, user2, amount, coin) => {
  let acc = '';
  try {
    acc = await window.ethereum.enable();
  } catch (err) {
    return 'Metamask Not Installed';
  }

  try {
    if (user1.BID === user2.BID) {
      return 'You Cannot send money to Yourself';
    }
    const chainId = 11155111;

    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.enable();
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + chainId.toString(16) }]
        });
      } catch (err) {
        await window.ethereum.enable();
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x' + chainId.toString(16),
              rpcUrls: ['https://rpc.sepolia.org', 'https://rpc.sepolia.dev', 'https://rpc.sepolia.online', 'https://www.sepoliarpc.space'],
              chainName: 'Sepolia',
              nativeCurrency: { name: 'SEP', decimals: 18, symbol: 'SEP' }
            }
          ]
        });
      }
    }
    let params = [
      {
        from: acc[0],
        to: user2.metamask,
        value: (Number(amount) * 1000000000000000000).toString(16),
        gas: Number(2100000).toString(16),
        gasPrice: Number(1000000).toString(16)
      }
    ];
    let result = '';
    try {
      result = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params
      });
    } catch (e) {
    console.log('Failed');
      return 'Error :' + e.code + '----' + e.message;
    }

    console.log('trasanctio hash :', result);
    if (result == null) {
      return 'Transaction Failed !';
    } else {

      const receiverRef = doc(db, '/users_search', user2.user_name);

      await updateDoc(receiverRef, {
        my_earnings: user2.my_earnings + (parseFloat(amount) - (user2.total_received_amount -( user2.my_return - user2.my_earnings) )),
        my_return : user2.my_return + parseFloat(amount) 
      });



      const user2Ref = collection(db, '/admin_transact');
      try{
      await setDoc(doc(user2Ref), {
        Transaction_ID: result,
        Transaction_Time: new Date(),
        Sender : user1.user_name,
        Sender_BID: user1.BID,
        Sender_metamask: user1.metamask,
        Receiver : user2.user_name,
        Receiver_BID: user2.BID,
        Reciver_metamask: user2.metamask,
        Coin_Type: "Ethereum",
        Value: parseFloat(amount),
        WeiAmount: amount * 1000000000000000
      });
    }catch(e){
      console.log(coin)
    }
      return 'Transaction Added Successfully';
    }
  } catch (error) {
    return 'Database Error !' + error;
  }
};




//Make Transaction
export const transact = async (user1, user2, amount, coin) => {
  let acc = '';
  try {
    acc = await window.ethereum.enable();
  } catch (err) {
    return 'Metamask Not Installed';
  }

  try {
    if (user1.BID === user2.BID) {
      return 'You Cannot send money to Yourself';
    }
    const familyRef = doc(db, '/users_search/' + user1.user_name + '/my_family', user2.user_name);

    const familySnap = await getDoc(familyRef);
    if (!familySnap.exists()) {
      return 'Given User is not your Friend ! User must be a Friend to send Money !';
    }
    const chainId = 11155111;

    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.enable();
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + chainId.toString(16) }]
        });
      } catch (err) {
        await window.ethereum.enable();
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x' + chainId.toString(16),
              rpcUrls: ['https://rpc.sepolia.org', 'https://rpc.sepolia.dev', 'https://rpc.sepolia.online', 'https://www.sepoliarpc.space'],
              chainName: 'Sepolia',
              nativeCurrency: { name: 'SEP', decimals: 18, symbol: 'SEP' }
            }
          ]
        });
      }
    }
    let params = [
      {
        from: acc[0],
        to: '0xD70fa3e32365417c4fabEeFa64eA91A4cA80610C',
        value: (Number(amount) * 1000000000000000000).toString(16),
        gas: Number(2100000).toString(16),
        gasPrice: Number(1000000).toString(16)
      }
    ];
    let result = '';
    try {
      result = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params
      });
    } catch (e) {
    console.log('Failed');
      return 'Error :' + e.code + '----' + e.message;
    }

    console.log('trasanctio hash :', result);
    if (result == null) {
      return 'Transaction Failed !';
    } else {
      const returnfamilyRef = doc(db, '/users_search/' + user2.user_name + '/my_family', user1.user_name);
      const returnfamilySnap = await getDoc(returnfamilyRef);
      const user2Ref = collection(db, '/pending_transact');
      
      //Admin referance 
      const adminref = doc(db, '/users_search/master');
      const adminSnap = await getDoc(adminref);
      
      
      const myRef = doc(db, '/users_search', user1.user_name);
      const receiverRef = doc(db, '/users_search', user2.user_name);

      let returnfamilyamount = returnfamilySnap.data().sent_amount;
      let sendercurrAmount = user1.total_invested_amount;
      let receivercurrAmount = user2.total_received_amount;
      let frndreceivedAmount = familySnap.data().received_amount;

      //Admin initial Values 
      let adminTotal = adminSnap.data().total_money;
      let adminTransaction = adminSnap.data().total_transaction;
     //console.log("Total amount" , adminTotal)
     //console.log("Total transact" , adminTransaction)

      await updateDoc(adminref, {
        total_money: parseFloat(adminTotal) + parseFloat(amount),
        total_transaction: parseFloat(adminTransaction) + parseFloat(1),
      });

      await updateDoc(returnfamilyRef, {
        sent_amount: parseFloat(returnfamilyamount) + parseFloat(amount)
      });
      await updateDoc(myRef, {
        total_invested_amount: parseFloat(sendercurrAmount) + parseFloat(amount)
      });
      await updateDoc(familyRef, {
        received_amount: parseFloat(frndreceivedAmount) + parseFloat(amount)
      });
      await updateDoc(receiverRef, {
        total_received_amount: parseFloat(receivercurrAmount) + parseFloat(amount)
      });
      console.log(user2Ref)
      try{
      await setDoc(doc(user2Ref), {
        Transaction_ID: result,
        Transaction_Time: new Date(),
        Sender : user1.user_name,
        Sender_BID: user1.BID,
        Sender_metamask: acc[0],
        Receiver : user2.user_name,
        Receiver_BID: user2.BID,
        Reciver_metamask: user2.metamask,
        Coin_Type: "Ethereum",
        Value: parseFloat(amount),
        WeiAmount: amount * 1000000000000000
      });
    }catch(e){
      console.log(coin)
    }
      return 'Transaction Added Successfully';
    }
  } catch (error) {
    return 'Database Error !' + error;
  }
};
//Transcations done
//Sent Trancation
export const search_senttransact = async (user) => {
  let transactions = [];
  try {
    //console.log(user.data().BID);
    const q = query(collection(db, 'pending_transact'), where('Sender_BID', '==', user.data().BID), orderBy('Transaction_Time', 'desc'));
    const querySnapshot = await getDocs(q);
    //console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
      const transaction = {
        fulldata: doc.data(),
        sender: doc.data().Sender + '(Me)',
        receiver: doc.data().Receiver,
        time: new Date(doc.data().Transaction_Time.seconds * 1000).toString(),
        amount: doc.data().Value,
        transaction_id: doc.data().Transaction_ID
      };
      transactions.push(transaction);
    });
  } catch (e) {
    //console.log(e);
  }
  return transactions;
};
//Recived Transcations
export const search_receivedtransact = async (user) => {
  let transactions = [];
  try {
    //console.log(user.data().BID);
    const q = query(collection(db, 'pending_transact'), where('Receiver_BID', '==', user.data().BID), orderBy('Transaction_Time', 'desc'));
    const querySnapshot = await getDocs(q);
    //console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
      const transaction = {
        sender: doc.data().Sender,
        receiver: doc.data().Receiver,
        time: new Date(doc.data().Transaction_Time.seconds * 1000).toString(),
        amount: doc.data().Value,
        transaction_id: doc.data().Transaction_ID
      };
      transactions.push(transaction);
    });
  } catch (e) {
    //console.log(e);
  }
  return transactions;
};

//Admin Transcation 
export const search_transact = async () => {
  let transactions = [];
  try {
    const q = query(
      collection(db, "pending_transact"),
      orderBy("Transaction_Time", "desc")
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log();
      const transaction = {
        sender: doc.data().Sender,
        receiver: doc.data().Receiver ,
        time: new Date(doc.data().Transaction_Time.seconds * 1000).toString(),
        amount: doc.data().Value,
        transaction_id: doc.data().Transaction_ID,
      };
      transactions.push(transaction);
    });
  } catch (e) {
    console.log(e);
  }
  return transactions;
};



export const invest_on_site = async(amount)  => {

  const chainId = 1;

    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.enable();
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + chainId.toString(16) }]
        });
      } catch (err) {
        await window.ethereum.enable();
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x' + chainId.toString(16),
              rpcUrls: ['https://rpc.sepolia.org', 'https://rpc.sepolia.dev', 'https://rpc.sepolia.online', 'https://www.sepoliarpc.space'],
              chainName: 'Sepolia',
              nativeCurrency: { name: 'SEP', decimals: 18, symbol: 'SEP' }
            }
          ]
        });
      }
    }
  
  const adminref = doc(db, '/users_search/master');
  const adminSnap = await getDoc(adminref);
  await updateDoc(adminref, {
    total_sent: parseFloat(adminSnap.data().total_sent) + parseFloat(amount),
  });
  
  };


  export const search_admin_transact = async () => {
    let transactions = [];
    try {
      const q = query(
        collection(db, "admin_transact"),
        orderBy("Transaction_Time", "desc")
      );
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        console.log();
        const transaction = {
          sender: doc.data().Sender,
          receiver: doc.data().Receiver ,
          time: new Date(doc.data().Transaction_Time.seconds * 1000).toString(),
          amount: doc.data().Value,
          transaction_id: doc.data().Transaction_ID,
        };
        transactions.push(transaction);
      });
    } catch (e) {
      console.log(e);
    }
    return transactions;
  };