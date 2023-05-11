import React, { lazy, useEffect } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import { useRoutes } from 'react-router';
import { useState } from 'react';
import { useUserAuth } from 'context/UserAuthContext';

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));
const UtilsTypography = Loadable(lazy(() => import('../views/Utils/Typography')));
const RegisterPage = Loadable(lazy(() => import('../views/Register')));
const LoginPage = Loadable(lazy(() => import('../views/Login')));
const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));
const Manage_Community = Loadable(lazy(() => import('../views/Manage_Community')));

// ==============================|| MAIN ROUTES ||============================== //
export default function MainRoutes() {
  const { user } = useUserAuth();
  console.log('user', user === null);
  const [balebale, setbale] = useState();
  useEffect(() => {
    setbale(true);
  }, [balebale]);
  return useRoutes([
    {
      path: '/',
      element: user === null ? <LoginPage /> : <MainLayout />,
      children: [
        {
          path: 'dashboard',
          element: <DashboardDefault />
        },
        {
          path: 'manage-community',
          element: <Manage_Community />
        },
        {
          path: 'send-transcations',
          element: <Manage_Community />
        },
        {
          path: 'recived-transcations',
          element: <Manage_Community />
        },
        { path: '/utils/util-typography', element: <UtilsTypography /> },
        { path: '/sample-page', element: <SamplePage /> }
      ]
    },

    {
      path: 'login',
      element: <LoginPage />
    },

    {
      path: 'register',
      element: <RegisterPage />
    },
    { path: 'sample-page', element: <SamplePage /> }
  ]);
}

// const MainRoutes = {
//   path: '/',
//   element: <LoginPage/>,
//   children: [
//     {
//       path: '/login',
//       element: <LoginPage />
//     },
//     {
//       path: '/dashboard/default',
//       element: <DashboardDefault />
//     },
//     { path: '/utils/util-typography', element: <UtilsTypography /> },
//     { path: '/sample-page', element: <SamplePage /> }
//   ]
// };

// export default MainRoutes;
