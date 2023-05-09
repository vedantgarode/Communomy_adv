import React, { lazy, useEffect } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import { useRoutes } from 'react-router';
import { useState } from 'react';

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));

const UtilsTypography = Loadable(lazy(() => import('../views/Utils/Typography')));

const LoginPage = Loadable(lazy(() => import('../views/Login')));
const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));

// ==============================|| MAIN ROUTES ||============================== //
export default function MainRoutes() {
  const [balebale, setbale] = useState();
  useEffect(() => {
    setbale(true);
  }, [balebale]);
  return useRoutes([
    {
      path: '/',
      element: balebale ? <LoginPage /> : <MainLayout />,
      children: [
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/dashboard/default',
          element: <DashboardDefault />
        },
        { path: '/utils/util-typography', element: <UtilsTypography /> },
        { path: '/sample-page', element: <SamplePage /> }
      ]
    }
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
