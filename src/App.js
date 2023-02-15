import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;