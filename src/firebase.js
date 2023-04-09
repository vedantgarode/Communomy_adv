import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  query,
  orderBy,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDz2MWbf5xqGdvjbVLgJD0vHK4l7qq18IM",
  authDomain: "communomyadv.firebaseapp.com",
  projectId: "communomyadv",
  storageBucket: "communomyadv.appspot.com",
  messagingSenderId: "577080900041",
  appId: "1:577080900041:web:5a3c3fc8f116f931861018",
  measurementId: "G-Q460RF8W7R",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const db = getFirestore(app);

export const search_familiy = async (user) => {
  let family = [];
  try {
    const querySnapshot = await getDocs(
      collection(db, "/users_search/" + user.displayName + "/my_family")
    );
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      const person = {
        name: doc.data().Name,
        receivedamount: doc.data().received_amount,
        sentamount: doc.data().sent_amount,
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

export const search_transact = async () => {
  let transactions = [];
  try {
    const q = query(collection(db, "pending_transact"), orderBy("Transaction_Time" , "desc"));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      console.log()
      const transaction = {
        sender: doc.data().Sender_BID,
        receiver: doc.data().Receiver_BID,
        time: new Date(doc.data().Transaction_Time.seconds*1000).toString(),
        amount: doc.data().Value,
        transaction_id : doc.data().Transaction_ID,
      };
      transactions.push(transaction);
      
    });
  } catch (e) {
    console.log(e);
  }
  return transactions;
};


export const search_my_transact = async (user) => {
  let transactions = [];
  try {
    console.log(user.data().BID)
    const q = query(collection(db, "pending_transact"), where("Sender_BID", "==" ,user.data().BID));
    const querySnapshot = await getDocs(q);
    //console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      const transaction = {
        sender: doc.data().Sender_BID + "(Me)",
        receiver: doc.data().Receiver_BID,
        time: new Date(doc.data().Transaction_Time.seconds*1000).toString(),
        amount: doc.data().Value,
        transaction_id : doc.data().Transaction_ID,
      };
      transactions.push(transaction);
      
    });
  } catch (e) {
    console.log(e);
  }
  return transactions;
};



export const add_familiy = async (user1, user2, u2Name) => {
  const DocRef = collection(
    db,
    "/users_search/" + user1.displayName + "/my_family"
  );
  const Doc2Ref = collection(
    db,
    "/users_search/" + user2.user_name + "/my_family"
  );
  const FrndRef = doc(
    db,
    "/users_search/" + user1.displayName + "/my_family",
    u2Name
  );
  const docSnap = await getDoc(FrndRef);

  if (docSnap.exists()) {
    return "User Already Friend !";
  } else {
    if (user1.uid === user2.BID) {
      return "Cannot Add Yorself";
    }
    await setDoc(doc(DocRef, u2Name), {
      Name: u2Name,
      BID: user2.BID,
      received_amount: 0,
      sent_amount: 0,
    });
    await setDoc(doc(Doc2Ref, user1.displayName), {
      Name: user1.displayName,
      BID: user1.uid,
      received_amount: 0,
      sent_amount: 0,
    });
    return "User Added !";
  }
};

export const transact = async (user1, user2, amount, coin) => {
  if (user1.BID === user2.BID) {
    return "You Cannot send money to Yourself";
  }
  const familyRef = doc(
    db,
    "/users_search/" + user1.user_name + "/my_family",
    user2.user_name
  );
  const familySnap = await getDoc(familyRef);
  // let params =[{
  //   from : user1.metamask,
  //   to :"0x9255153815a9948d44e6F121A11deD4b4823a3d9",
  //   gas :Number(21000).toString(16),
  //   gasPrice :Number(40000000000).toString(16),
  //   value : (Number(amount)*1000000000000000000).toString(16),
  // }];

  // let result =  await window.ethereum.request({method :"eth_sendTransaction", params}).catch((err) => {
  //   console.log(err)
  // })
  //console.log("trasanctio hash :" , typeof(result));
  if (!familySnap.exists()) {
    return "Given User is not your Friend ! User must be a Friend to send Money !";
  }
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
    total_invested_amount: parseFloat(sendercurrAmount) + parseFloat(amount),
  });
  await updateDoc(familyRef, {
    received_amount: parseFloat(frndreceivedAmount) + parseFloat(amount),
  });
  await updateDoc(receiverRef, {
    total_received_amount: parseFloat(receivercurrAmount) + parseFloat(amount),
  });

  await setDoc(doc(user2Ref), {
    Transaction_ID: "Function Commented",
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
};

export const findUser = async (user_name) => {
  const docRef = doc(db, "/users_search", user_name);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap;
  } else {
    console.log("No such document!");
    return false;
  }
};

export const register_User = async (user, metaAdd) => {
  if (!user) alert("No User Found !");
  const userRef = collection(db, "/users_search");
  try {
    await setDoc(doc(userRef, user.displayName), {
      BID: user.uid,
      metamask: metaAdd,
      user_name: user.displayName,
      email: user.email,
      total_invested_amount: 0,
      total_received_amount: 0,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log("Error in creating user", error);
  }
};

export const createUserDocument = async (user, metaAdd) => {
  if (!user) alert("No User Found !");

  const userRef = collection(db, "/users");
  try {
    await setDoc(doc(userRef, user.uid), {
      BID: user.uid,
      user_Name: user.displayName,
      email: user.email,
      createdAt: new Date(),
      metamask: metaAdd,
      total_invested_amount: 0,
      total_received_amount: 0,
    });
  } catch (error) {
    console.log("Error in creating user", error);
  }
};
