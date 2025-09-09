import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import MyTaskPage from '@/pages/MyTaskPage';
import ProjectPage from '@/pages/ProjectPage';
import { createBrowserRouter, RouterProvider } from 'react-router';

export const ROUTE_PATH = {
  MAIN: '/',
  LOGIN: '/login',
  PROJECT: '/project/:projectId',
  MYTASK: '/my-task',
};

const router = createBrowserRouter([
  { path: ROUTE_PATH.MAIN, element: <LandingPage /> },
  {
    path: ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTE_PATH.PROJECT,
    element: <ProjectPage />,
  },
  {
    path: ROUTE_PATH.MYTASK,
    element: <MyTaskPage />,
  },
]);
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
