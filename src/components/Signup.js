import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { createUserDocument ,register_User } from "../firebase";
import { updateProfile } from "firebase/auth";

const Signup = () => {
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const {user} = await signUp(email, password);
      await updateProfile(user ,{
        displayName : user_name.trim().toLowerCase(),
      })
      createUserDocument(user);
      register_User(user);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

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
              onChange={(e) => setUserName(e.target.value)}
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

          <div>
            <Button variant="primary" type="Submit">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div>
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
};

export default Signup;