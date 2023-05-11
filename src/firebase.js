import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, getDoc, getDocs, collection } from 'firebase/firestore';
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


//Make Transaction
export const transact = async (user1, user2, amount, coin) => {
  let acc = "";
  try {
    acc = await window.ethereum.enable();
  } catch (err) {
    return "Metamask Not Installed";
  }

  try {
    if (user1.BID === user2.BID) {
      return "You Cannot send money to Yourself";
    }
    const familyRef = doc(
      db,
      "/users_search/" + user1.user_name + "/my_family",
      user2.user_name
    );

    const familySnap = await getDoc(familyRef);
    if (!familySnap.exists()) {
      return "Given User is not your Friend ! User must be a Friend to send Money !";
    }
    const chainId = 11155111;

    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.enable();
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x" + chainId.toString(16) }],
        });
      } catch (err) {
        await window.ethereum.enable();
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x" + chainId.toString(16),
              rpcUrls: [
                "https://rpc.sepolia.org",
                "https://rpc.sepolia.dev",
                "https://rpc.sepolia.online",
                "https://www.sepoliarpc.space",
              ],
              chainName: "Sepolia",
              nativeCurrency: { name: "SEP", decimals: 18, symbol: "SEP" },
            },
          ],
        });
      }
    }
    let params = [
      {
        from: acc[0],
        to: "0x40D1ddEdbf41C673b1257fB740DDC60ACE4be37C",
        value: (Number(amount) * 1000000000000000000).toString(16),
        gas: Number(2100000).toString(16),
        gasPrice: Number(1000000).toString(16),
      },
    ];
    let result = "";
    try {
      result = await window.ethereum.request({
        method: "eth_sendTransaction",
        params,
      });
    } catch (e) {
      console.log("Failed");
      return "Error :" + e.code + "----" + e.message;
    }

    console.log("trasanctio hash :", result);
    if (result == null) {
      return "Transaction Failed !";
    } else {
      const returnfamilyRef = doc(
        db,
        "/users_search/" + user2.user_name + "/my_family",
        user1.user_name
      );
      const returnfamilySnap = await getDoc(returnfamilyRef);

      const user2Ref = collection(db, "/pending_transact");
      const myRef = doc(db, "/users_search", user1.user_name);
      const receiverRef = doc(db, "/users_search", user2.user_name);

      let returnfamilyamount = returnfamilySnap.data().sent_amount;
      let sendercurrAmount = user1.total_invested_amount;
      let receivercurrAmount = user2.total_received_amount;
      let frndreceivedAmount = familySnap.data().received_amount;

      await updateDoc(returnfamilyRef, {
        sent_amount: parseFloat(returnfamilyamount) + parseFloat(amount),
      });
      await updateDoc(myRef, {
        total_invested_amount:
          parseFloat(sendercurrAmount) + parseFloat(amount),
      });
      await updateDoc(familyRef, {
        received_amount: parseFloat(frndreceivedAmount) + parseFloat(amount),
      });
      await updateDoc(receiverRef, {
        total_received_amount:
          parseFloat(receivercurrAmount) + parseFloat(amount),
      });

      await setDoc(doc(user2Ref), {
        Transaction_ID: result,
        Transaction_Time: new Date(),
        Sender_BID: user1.BID,
        Sender_metamask: user1.metamask,
        Receiver_BID: user2.BID,
        Reciver_metamask: user2.metamask,
        Coin_Type: coin,
        Value: parseFloat(amount),
        WeiAmount: amount * 1000000000000000,
      });
      return "Transaction Added Successfully";
    }
  } catch (error) {
    return "Database Error !" + error;
  }
};
