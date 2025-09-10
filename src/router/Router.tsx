import LoginPage from '@/pages/LoginPage';
import ProjectPage from '@/pages/ProjectPage';
import { createBrowserRouter, RouterProvider } from 'react-router';

export const ROUTE_PATH = {
  LOGIN: '/login',
  PROJECT: '/project',
};

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTE_PATH.PROJECT,
    element: <ProjectPage />,
  },
]);
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
