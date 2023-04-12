import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { Button, Box, FormGroup ,Typography } from "@mui/material";
import { search_transact } from "../firebase";

const Admin = () => {
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();
  const switchToHome = async () => {
    navigate("/home");
  };
  const printTransactions = async (e) => {
    e.preventDefault();
    try {
      setTransactions(await search_transact());
      console.log(transactions)
    } catch (error) {
      console.log("Transaction Searching Failed !");
    }
  };

  const validate = async (e) => {
    e.preventDefault();
    try {
      console.log(e.currentTarget.value)
      window.open(
        "https://sepolia.etherscan.io/tx/"+e.currentTarget.value, "_blank");
      
    } catch (error) {
      console.log("Validation Failed !" ,error);
    }
  };

  


  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins"].join(","),
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box
        bgcolor="#442C2E"
        sx={{
          borderRadius: "20 px",
          display: "flex",
          p: 2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <Box
          bgcolor="#FEDBD0"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
            borderRadius: 2,
            boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.2)",
            maxWidth: "90%",
          }}
        >
          <FormGroup>
            <Button variant="contained" color="secondary" onClick={switchToHome}>
              Home
            </Button>
          </FormGroup>
          <br></br>
          <FormGroup>
            <Button variant="contained" color="secondary" onClick={printTransactions}>
                All Transactions
            </Button>
            
            
          
            {transactions?.map((row) => (
              <div id = {row.transaction_id}>
                <Box sx={{ mt: 2 }} key={row.name}>
                <Typography variant="subtitle1">
                <b>Sender : </b> {row.sender}</Typography>
                <Typography variant="subtitle1">
                <b>Receiver :</b>  {row.receiver}
                </Typography>
                <Typography variant="subtitle1">
                <b>Amount :</b> {row.amount}
                </Typography>
                <Typography variant="subtitle1">
                <b>Transaction ID :</b> {row.transaction_id}
                </Typography>
                <Typography variant="subtitle1">
                <b>Transaction Time :</b> {row.time}
                </Typography>
                <Typography variant="subtitle1">
                <b>Status :</b> Pending
                </Typography>
                <Button variant="outlined" value = {row.transaction_id} color="error" onClick={validate}>
                  Validate
                </Button>
                <hr></hr>
              </Box>
              </div>
            ))}
              </FormGroup>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Admin;
