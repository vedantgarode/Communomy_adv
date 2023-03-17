import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { createUserDocument, register_User, findUser } from "../firebase";
import { updateProfile } from "firebase/auth";

const Signup = (props) => {
  const { walletAdd } = props
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  //const [metamask_add, setMeta_add] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();
  const { user } = useUserAuth();
  //console.log("hurrrrrrr",walletAdd)
  //console.log("i am func",handleMetaMask)
  if (user) {
    navigate("/home");
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const  adder  =await findUser(user_name.trim().toLowerCase());
      adder.data();
      setError("User name taken Found !");
      console.log("user name taken !");
    } catch (error) {
      try{
      const { user } = await signUp(email, password);
        await updateProfile(user, {
          displayName: user_name.trim().toLowerCase(),
        })
        createUserDocument(user, walletAdd);
        register_User(user, walletAdd);
        navigate("/home");
      }
      catch(error){
        setError("Email Already in Use !");
      }
    }
      
  };
  //console.log("okay test",Wallet)
  return (
    <>
      <div>
        <h2 >Firebase Auth Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="username"
              placeholder="User Name"
              onChange={(e) => {
                setUserName(e.target.value)
                //console.log(newval0,"h",e.target.value)
                }}
            />
          </Form.Group>
          <Form.Group >
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Metamask Address"
              disabled
              value={walletAdd}
//              onChange={(e) => setMeta_add(e.target.value)}
            />
          </Form.Group>

          <div>
            {walletAdd === "" && <h1>Connect wallet to sign up</h1>}
            {walletAdd !== "" && <Button variant="primary" type="Submit">
              Sign up
            </Button>}

          </div>
        </Form>
      </div>
      <div>
        Already have an account? <Link to="/">Log In</Link>
        {/* <Wallet/> */}
      </div>
    </>
  );
};

export default Signup;