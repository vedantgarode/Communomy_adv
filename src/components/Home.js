import React, { useState } from "react";
import { findUser, transact, add_familiy, search_familiy } from "../firebase";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';


import {
  Button,
  FormControl,
  TextField,
  FormGroup,
  Input,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";



const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
    ].join(','),
  },
});
const InfoCard = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "90%",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  backgroundColor: "#FEEAE6",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  "& > *": {
    marginBottom: theme.spacing(1),
  },
}));

const Home = () => {
  const { logOut, user } = useUserAuth();
  const [Terror, setTError] = useState("");
  const [my_friends, SearchFriend] = useState([]);
  const [frnd_added, setFriend] = useState("");
  const [userSearchResult, setUserSearchResult] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [userAmount, setAmount] = useState(0);
  const [logedUser, setlogedUser] = useState();
  const [userCoin, setCoin] = useState("Etherium");
  const [user_search_metamask, setUserSearchMetamask] = useState("");
  const [user_search_bid, setUserSearchBID] = useState("");
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

  const switchToAdmin = async () => {
    navigate("/admin");
  };

  const Search_familiy = async (e) => {
    e.preventDefault();
    try {
      SearchFriend(await search_familiy(user));
    } catch (error) {
      console.log("Friend Searching Failed !");
    }
  };
  const Add_familiy = async (e) => {
    e.preventDefault();
    try {
      const user2 = await findUser(userSearch.trim().toLowerCase());
      setFriend(
        await add_familiy(user, user2.data(), userSearch.trim().toLowerCase())
      );
    } catch (error) {
      console.log("Friend addition Failed !");
      console.log(error);
    }
  };

  const transaction = async (e) => {
    e.preventDefault();
    if (userAmount < 0 || userAmount === "0" || userAmount === "") {
      setTError("Enter Valid Amount !");
    } else {
      try {
        const user2 = await findUser(userSearch.trim().toLowerCase());
        const sender = await findUser(user.displayName.trim().toLowerCase());
        setTError(
          await transact(sender.data(), user2.data(), userAmount, userCoin)
        );
      } catch (error) {
        setTError("Select Valid User !");
        console.log("Transaction Failed !", error);
      }
    }
  };

  const find = async (e) => {
    setUserSearchResult(userSearch);
    e.preventDefault();
    try {
      const user2 = await findUser(userSearch.trim().toLowerCase());
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
    <ThemeProvider theme={theme}>
    <Box bgcolor ='#442C2E' 
      sx={{
        borderRadius : '20 px',
        display: "flex",
        p :5 ,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
      }}
    >
      <Box bgcolor ='#FEDBD0'
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow :"auto",
          p: 2,
          borderRadius: 2,
          boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.2)",
          maxWidth: "90%",
          minWidth: "60%"
        }}
      >
        <FormGroup>
          <Button variant="contained"  color ="error" onClick={handleLogout}>Log out</Button>
        </FormGroup>
        <br></br>
        <FormGroup>
          <Button variant="contained"  color ="error" onClick={switchToAdmin}>Admin</Button>
        </FormGroup>
        <br></br>
        <InfoCard sx={{ marginTop: "1rem" }}>
          <Button onClick={my_info} variant="contained" color = "success" >
            My Profile
          </Button>
          <Typography align="center" variant="h6" sx={{ mt: 2 }}>
            Hello {user.displayName} , Welcome
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 1 }}>
           <b> Email: </b> {user && user.email}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
          <b> BID: </b> {user && user.uid}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
          <b>Total Invested Amount: </b> {logedUser?.total_invested_amount}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
          <b> Total Received Amount:</b> {logedUser?.total_received_amount}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
          <b> My Metamask:</b> {logedUser?.metamask}
          </Typography>
        </InfoCard>

        <br></br>

        <InfoCard sx={{ mt: 3, p: 2, width: "100%" }}>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            label="User Name to search"
            placeholder="User Name to search"
            onChange={(e) => setUserSearch(e.target.value)}
          />
          <Button variant="contained" color = "success"  sx={{ mt: 2 }} onClick={find}>
            Search
          </Button>
          <br></br>
          <Typography variant="subtitle1">
            <b>User Name : </b>{userSearchResult.trim().toLowerCase()}
          </Typography>
          <Typography variant="subtitle1">
             <b>User BID : </b> {user_search_bid}
          </Typography>
          <Typography variant="subtitle1">
          <b>User Metamask :  </b>{user_search_metamask}
          </Typography>
          <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mt: 2,
          }}
        >
        </FormGroup>
          <Button sx={{ mt: 2 }} onClick={Add_familiy} variant="contained" color = "success" >
            Add Friend
          </Button>
        <Box color="red" sx={{ mt: 2 }}>
          {frnd_added}
        </Box>
        </InfoCard>


        
        

        <br></br>

        <InfoCard align="center">
          <FormGroup
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" , justifyContent :'center' }}
          >
            <FormControl>
              <Input
                
                placeholder="Enter Amount"
                type="number"
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter Coin Type"
                onChange={(e) => setCoin(e.target.value)}
              />
            </FormControl>
          </FormGroup>

          <br></br>

          <Button onClick={transaction} variant="contained" color = "success" >
            Make Transaction
          </Button>
          <Box color="red" sx={{ ml: 2 }}>
            {Terror}
          </Box>
        </InfoCard>

        <br></br>

        <InfoCard>
          <FormGroup sx={{ mt: 2 }}>
            {my_friends.map((row) => (
              <Box sx={{ mt: 2 }} key={row.name}>
                <Typography variant="subtitle1">
                <b>Name: </b> {row.name}</Typography>
                <Typography variant="subtitle1">
                <b> Sent:</b>  {row.receivedamount}
                </Typography>
                <Typography variant="subtitle1">
                <b>  Received Amount:</b> {row.sentamount}
                </Typography>
              </Box>
            ))}
            <Button onClick={Search_familiy} variant="contained" color = "success" >
              View My Community members
            </Button>
          </FormGroup>
        </InfoCard>
        <br></br>
        
      </Box>
    </Box>
  </ThemeProvider>
  );
};

export default Home;
