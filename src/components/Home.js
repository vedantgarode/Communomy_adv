import React , { useState }from "react";
import { findUser , transact} from "../firebase";
import { useNavigate } from "react-router";
import { Form} from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const [Terror, setTError] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [user_search_metamask , setUserSearchMetamask] = useState("");
  const [user_search_bid , setUserSearchBID] = useState("");
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const transaction = async (e) =>{
    e.preventDefault();
    try {
      const  user2  =await findUser(userSearch.trim().toLowerCase());
      const IError = await transact(user , user2.data());

      setTError(IError);
      console.log(Terror);
    } catch (error) {
      console.log("No user Found !");
    }
  };



  const find = async (e) => {
    e.preventDefault();
    try {
      const  user2  =await findUser(userSearch.trim().toLowerCase());
      setUserSearchBID(user2.data().BID);
      setUserSearchMetamask(user2.data().metamask);
    } catch (error) {
      setUserSearchBID("No User Found !");
      setUserSearchMetamask("No User Found !");
      console.log("No user Found !");
    }
  };
 
  return (
    <>
      <div>
        Hello Welcome <br />
        User Name : {user.displayName}<br />
        Email :{user && user.email} <br />
        BID : {user && user.uid}
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
        <button onClick={transaction}>
          Make Transaction
        </button><br />
        { Terror }
      </div>
      <div>
        User BID : {user_search_bid}<br />
        User metamask: {user_search_metamask}
      </div>
      </div>
    </>
  );
};

export default Home;