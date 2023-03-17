
import { initializeApp } from "firebase/app";
import { getAuth  } from 'firebase/auth'
import {collection, getFirestore ,doc, setDoc  ,getDoc ,getDocs} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDz2MWbf5xqGdvjbVLgJD0vHK4l7qq18IM",
  authDomain: "communomyadv.firebaseapp.com",
  projectId: "communomyadv",
  storageBucket: "communomyadv.appspot.com",
  messagingSenderId: "577080900041",
  appId: "1:577080900041:web:5a3c3fc8f116f931861018",
  measurementId: "G-Q460RF8W7R"
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const db = getFirestore(app);



async function getAccount() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = accounts[0];
  return account;
}

export const  handleMetaMask = async () => {
  //console.log("heheheh)))))", window.ethereum);
  
  if (typeof window !== "undefined") {
    getAccount().then((res) => {
      // setAcc_add(res);
      // getBalnce(res);
      const account = res;
      return account;
    });
  }
};




export const search_familiy = async(user) =>{
  const family =[];
  try{
  const querySnapshot = await getDocs(collection(db, "/users_search/"+user.displayName+"/my_family"));
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
  family.push(doc.data().Name);
});
  }catch(e){
    console.log(e);
  }
  return family;
}


export const add_familiy = async(user1, user2 ,u2Name) =>{
  const DocRef = collection(db ,"/users_search/"+user1.displayName+"/my_family");
  const FrndRef = doc(db, "/users_search/"+user1.displayName+"/my_family", u2Name);
  const docSnap = await getDoc(FrndRef);
  //console.log(docSnap.data());
  if (docSnap.exists() ) {
    return "User Already Friend !";
  } 
  else {
    await setDoc(doc(DocRef ,u2Name),{
      Name : u2Name,
      BID :user2.BID,
      })
      return "User Added !";
  }
}


export const transact = async(user1, user2 ,amount , coin) =>{
  const user2Ref = collection(db ,"/pending_transact");
  //console.log("Sender :" ,user2);
  //console.log(user2);
  await setDoc(doc(user2Ref),{
  Transaction_Time : new Date(),
  Sender_BID : user1.BID,
  Sender_metamask : user1.metamask,
  Receiver_BID : user2.BID,
  Reciver_metamask : user2.metamask,
  Coin_Type : coin,
  Value : parseInt(amount),
  })
  return "Transaction Added Successfully"
}

export const findUser = async (user_name) => {
  const docRef = doc(db ,"/users_search" ,user_name );
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists() ) {
    //console.log("User data:", docSnap.data());
    return docSnap;
  } else {
    console.log("No such document!");
    return false;
  }
}

export const register_User = async (user, metaAdd) => {
  if (!user) alert("No User Found !");
  const userRef = collection(db ,"/users_search" );
  try {
    await setDoc(doc(userRef,user.displayName),{
      BID : user.uid,
      metamask : metaAdd,
      user_name :user.displayName,
      email : user.email,
      invested_amount : 0,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log('Error in creating user', error);
  }
}




export const createUserDocument = async (user ,metaAdd) => {
  if (!user) alert("No User Found !");
  
  const userRef = collection(db ,"/users" );
  try {
    await setDoc(doc(userRef ,user.uid),{
      BID : user.uid,
      user_Name :user.displayName,
      email :user.email,
      createdAt: new Date(),
      metamask : metaAdd,
      invested_amount : 0
    });
  } catch (error) {
    console.log('Error in creating user', error);
  }
};
