import AppLayout from '@/app/layout/AppLayout';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import MyTaskPage from '@/pages/MyTaskPage';
import ProjectPage from '@/pages/ProjectPage';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import ProtectedRoute from '@/app/routes/ProtectedRoute';
import ServerErrorPage from '@/pages/ServerErrorPage';

export const ROUTE_PATH = {
  MAIN: '/',
  LOGIN: '/login',
  PROJECT: '/project/:projectId',
  MYTASK: '/my-task',
  ERROR: '/error',
};
const PUBLIC_ROUTES = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/error', element: <ServerErrorPage /> },
];
const PROTECTED_ROUTES = [
  { path: '/project/:projectId', element: <ProjectPage /> },
  { path: '/my-task', element: <MyTaskPage /> },
];

export const router = createBrowserRouter([
  { path: ROUTE_PATH.MAIN, element: <LandingPage /> },
  { path: ROUTE_PATH.LOGIN, element: <LoginPage /> },

  {
    path: '/',
    element: <AppLayout />,
    children: [
      // 공개 라우트
      ...PUBLIC_ROUTES,
      // 보호된 라우트
      ...PROTECTED_ROUTES.map((route) => ({
        ...route,
        element: <ProtectedRoute>{route.element}</ProtectedRoute>,
      })),
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
