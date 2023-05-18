import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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




//Code For Finding User
export const findUser = async (user_name) => {
  const docRef = doc(db, '/users_search', user_name);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap;
  } else {
    console.log('No such document!');
    return false;
  }
};

//All users Array
export const search_all_user = async () => {
  let family = [];
  try {
    const querySnapshot = await getDocs(collection(db, '/users_search'));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      const person = {
        name: doc.data().user_name,
        bid: doc.data().BID,
        receivedamount: doc.data().total_received_amount
      };
      family.push(person);
      console.log("All USer :" ,family);
      console.log(person);
    });
  } catch (e) {
    console.log(e);
  }
  return family;
};

//Family Community Friends
//SearchFamily
export const search_familiy = async (user) => {
  let family = [];
  try {
    const querySnapshot = await getDocs(collection(db, '/users_search/' + user.displayName + '/my_family'));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      const person = {
        name: doc.data().Name,
        receivedamount: doc.data().received_amount,
        sentamount: doc.data().sent_amount,
        bid: doc.data().BID
      };
      family.push(person);
      // console.log(family);
      console.log(person);
    });
  } catch (e) {
    console.log(e);
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
        to: '0x40D1ddEdbf41C673b1257fB740DDC60ACE4be37C',
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
     console.log("Total amount" , adminTotal)
     console.log("Total transact" , adminTransaction)

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

      await setDoc(doc(user2Ref), {
        Transaction_ID: result,
        Transaction_Time: new Date(),
        Sender : user1.user_name,
        Sender_BID: user1.BID,
        Sender_metamask: user1.metamask,
        Receiver : user2.user_name,
        Receiver_BID: user2.BID,
        Reciver_metamask: user2.metamask,
        Coin_Type: coin,
        Value: parseFloat(amount),
        WeiAmount: amount * 1000000000000000
      });
      return 'Transaction Added Successfully';
    }
  } catch (error) {
    return 'Database Error !' + error;
  }
};
//Transcations
//Sent Trancation
export const search_senttransact = async (user) => {
  let transactions = [];
  try {
    console.log(user.data().BID);
    const q = query(collection(db, 'pending_transact'), where('Sender_BID', '==', user.data().BID), orderBy('Transaction_Time', 'desc'));
    const querySnapshot = await getDocs(q);
    //console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      const transaction = {
        fulldata: doc.data(),
        sender: doc.data().Sender_BID + '(Me)',
        receiver: doc.data().Receiver_BID,
        time: new Date(doc.data().Transaction_Time.seconds * 1000).toString(),
        amount: doc.data().Value,
        transaction_id: doc.data().Transaction_ID
      };
      transactions.push(transaction);
    });
  } catch (e) {
    console.log(e);
  }
  return transactions;
};
//Recived Transcations
export const search_receivedtransact = async (user) => {
  let transactions = [];
  try {
    console.log(user.data().BID);
    const q = query(collection(db, 'pending_transact'), where('Receiver_BID', '==', user.data().BID), orderBy('Transaction_Time', 'desc'));
    const querySnapshot = await getDocs(q);
    //console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      const transaction = {
        sender: doc.data().Sender_BID,
        receiver: doc.data().Receiver_BID,
        time: new Date(doc.data().Transaction_Time.seconds * 1000).toString(),
        amount: doc.data().Value,
        transaction_id: doc.data().Transaction_ID
      };
      transactions.push(transaction);
    });
  } catch (e) {
    console.log(e);
  }
  return transactions;
};
