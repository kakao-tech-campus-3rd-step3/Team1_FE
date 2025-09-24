import AppLayout from '@/app/layout/AppLayout';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import MyTaskPage from '@/pages/MyTaskPage';
import ProjectPage from '@/pages/ProjectPage';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import ProtectedRoute from '@/app/routes/ProtectedRoute';
import ServerErrorPage from '@/pages/ServerErrorPage';
import ModalTestPage from '@/pages/ModalTestPage';
import AvatarPickerPage from '@/pages/AvatarPickerPage';
import KakaoCallbackPage from '@/pages/KakaoCallbackPage';

export const ROUTE_PATH = {
  MAIN: '/',
  LOGIN: '/login',
  PROJECT: '/project/:projectId',
  MYTASK: '/my-task',
  ERROR: '/error',
  MODAL: '/modal-test',
  AVATAR: '/avatar',
  CALLBACK: '/auth/callback',
};

const PUBLIC_ROUTES = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/error', element: <ServerErrorPage /> },
  { path: ROUTE_PATH.MODAL, element: <ModalTestPage /> },
  { path: ROUTE_PATH.CALLBACK, element: <KakaoCallbackPage /> },
];

const PROTECTED_ROUTES = [
  { path: '/project/:projectId', element: <ProjectPage /> },
  { path: '/my-task', element: <MyTaskPage /> },
  { path: '/avatar', element: <AvatarPickerPage /> },
];

export const router = createBrowserRouter([
  // 공개 라우트
  ...PUBLIC_ROUTES,
  {
    path: '/',
    element: <AppLayout />,
    children: [
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
