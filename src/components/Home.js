import React , { useState }from "react";
import { findUser } from "../firebase";
import { useNavigate } from "react-router";
import { Form} from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const [bid, setbid] = useState("");
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
  const find = async (e) => {
    e.preventDefault()
    try {
      const  user2  =await findUser(bid);
      setUserSearchBID(user2.data().BID);
      setUserSearchMetamask(user2.data().metamask);
    } catch (error) {
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
              onChange={(e) => setbid(e.target.value)}
            />
          </Form.Group>
        </Form>
        <button onClick={find}>
          Find
        </button>
        <div>
        Result - <br />
        User BID : {user_search_bid}<br />
        User metamask: {user_search_metamask}
      </div>
      </div>
    </>
  );
};

export default Home;