import React from 'react';

// material-ui
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// third-party
import { useSelector } from 'react-redux';

// project import
import theme from 'themes';
// import Routes from 'routes/index';
import MainRoutes from 'routes/MainRoutes';
import NavigationScroll from './NavigationScroll';
import { UserAuthContextProvider } from 'context/UserAuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the CSS styles

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <>
      {
        <>
          <NavigationScroll>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme(customization)}>
                <CssBaseline />
                <UserAuthContextProvider>
                  <MainRoutes />
                </UserAuthContextProvider>
                <ToastContainer/>
              </ThemeProvider>
            </StyledEngineProvider>
          </NavigationScroll>
        </>
      }
    </>
  );
};

export default App;
