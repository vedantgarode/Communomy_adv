
import { initializeApp } from "firebase/app";
import { getAuth  } from 'firebase/auth'
import {collection, getFirestore ,doc, setDoc  ,getDoc} from "firebase/firestore";

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


export const findUser = async (BID) => {
  const docRef = doc(db ,"/users_search" ,BID );
  const docSnap = await getDoc(docRef);

  if (docSnap.exists() ) {
    console.log("User data:", docSnap.data());
    return docSnap;
  } else {
    console.log("No such document!");
  }
}

export const register_User = async (user) => {
  if (!user) alert("No User Found !");
  const userRef = collection(db ,"/users_search" );
  try {
    await setDoc(doc(userRef,user.displayName),{
      BID : user.uid,
      metamask : "dfbsdjhsdsdhbdhbshDB"
    });
  } catch (error) {
    console.log('Error in creating user', error);
  }
}




export const createUserDocument = async (user) => {
  if (!user) alert("No User Found !");
  
  const userRef = collection(db ,"/users" );
  try {
    await setDoc(doc(userRef ,user.uid),{
      BID : user.uid,
      user_Name :user.displayName,
      email :user.email,
      createdAt: new Date(),
      metamask : "dfbsdjhsdsdhbdhbshDB"
    });
  } catch (error) {
    console.log('Error in creating user', error);
  }
};
