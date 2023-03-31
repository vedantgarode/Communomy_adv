import React , { useState }from "react";
import { findUser , transact , add_familiy , search_familiy } from "../firebase";
import { useNavigate } from "react-router";
import { Form} from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";



const Home = () => {
  const { logOut, user } = useUserAuth();
  const [Terror, setTError] = useState("");
  const [my_friends, SearchFriend] = useState([]);
  const [frnd_added, setFriend] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [userAmount, setAmount] = useState(0);
  const [logedUser, setlogedUser] = useState();
  const [userCoin, setCoin] = useState("Etherium");
  const [user_search_metamask , setUserSearchMetamask] = useState("");
  const [user_search_bid , setUserSearchBID] = useState("");
  const navigate = useNavigate();

  const my_info = async (e) => {
    e.preventDefault();
    try {
      setlogedUser((await findUser(user.displayName)).data());
      //console.log(logedUser); 
    } catch (error) {
      setUserSearchBID("No User Found !");
      setUserSearchMetamask("No User Found !");
      console.log("No user Found !");
    }
  };
  
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const Search_familiy = async(e) =>{
    e.preventDefault();
    try {
      
      SearchFriend(await search_familiy(user)); 
      
       
    } catch (error) {
      console.log("Friend Searching Failed !");
    }
    
  }
  const Add_familiy =async(e) =>{
    e.preventDefault();
    try {
      const  user2  =await findUser(userSearch.trim().toLowerCase());
      setFriend(await add_familiy(user , user2.data(), userSearch.trim().toLowerCase()));           
    } catch (error) {
      console.log("Friend addition Failed !");
      console.log(error);
    }
  }


  const transaction = async (e) =>{
    e.preventDefault();
    try {
      const  user2  =await findUser(userSearch.trim().toLowerCase());
      const  sender  =await findUser(user.displayName.trim().toLowerCase());
      setTError(await transact(sender.data() , user2.data() , userAmount , userCoin)); 
    } catch (error) {
      console.log("Transaction Failed !" ,error);
    }
  };



  const find = async (e) => {
    e.preventDefault();
    try {
      const  user2  =await findUser(userSearch.trim().toLowerCase());
      //console.log(user2);
      setUserSearchBID(user2.data().BID);
      setUserSearchMetamask(user2.data().metamask);
    } catch (error) {
      setUserSearchBID("No User Found !");
      setUserSearchMetamask("No User Found !");
      console.log("No user Found !");
      console.log(error);
    }
  };
 
  return (
    <>
      <div>
      <button onClick={my_info}>
          My Profile 
        </button><br />
        Hello Welcome <br />
        User Name : {user.displayName}<br />
        Email :{user && user.email} <br />
        BID : {user && user.uid} <br />
        Total Invested Amount : {logedUser?.total_invested_amount} <br />
        Total Received Amount :  {logedUser?.total_received_amount} <br />
        My Metamask :  {logedUser?.metamask} <br />
      </div>
      
      <div>
        <button onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div>
      <Form>
          <Form.Group >
            <Form.Control
              type="text"
              placeholder="User Name to search"
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </Form.Group>
        </Form>
        <div>
        <button onClick={find}>
          Search
        </button>
        <div>
        Receiver BID : {user_search_bid}<br />
        Receiver metamask: {user_search_metamask}
        </div>
        <Form>
          <Form.Group >
            <Form.Control
              type="number"
              placeholder="Enter Amount "
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group >
            <Form.Control
              type="text"
              placeholder="Enter Coin Type"
              onChange={(e) => setCoin(e.target.value)}
            />
          </Form.Group>
        </Form>
        <button onClick={transaction}>
          Make Transaction
        </button><br />
        { Terror }<br />
        <button onClick={Add_familiy}>
          Add Friend
        </button><br />
        { frnd_added }<br />
        <button onClick={ Search_familiy }>
          View My Community members
        </button><br />
        {my_friends.map((row)=>
            //index%2===0?<>{row}</>:<>: {row}<br></br></>
            <div>Name : {row.name} <br></br> Sent : {row.receivedamount} <br></br>Received Amount :{row.sentamount} <br></br><br></br></div>
        )}
        
        <div id="my_friends"></div>
     
      </div>
      
      </div>
    </>
  );
};

export default Home;