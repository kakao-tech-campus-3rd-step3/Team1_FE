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
import TaskDetailPage from '@/pages/TaskDetailPage';
import ApiHealthCheck from '@/features/health-check/ApiHealthCheck';

export const ROUTE_PATH = {
  MAIN: '/',
  LOGIN: '/login',
  PROJECT: '/project/:projectId',
  MYTASK: '/my-task',
  ERROR: '/error',
  MODAL: '/modal-test',
  AVATAR: '/avatar',
  CALLBACK: '/auth/callback',
  API_CHECK: '/health',
  TASK_DETAIL: '/task-detail',
};

const PUBLIC_ROUTES = [
  { path: ROUTE_PATH.MAIN, element: <LandingPage /> },
  { path: ROUTE_PATH.LOGIN, element: <LoginPage /> },
  { path: ROUTE_PATH.ERROR, element: <ServerErrorPage /> },
  { path: ROUTE_PATH.MODAL, element: <ModalTestPage /> },
  { path: ROUTE_PATH.CALLBACK, element: <KakaoCallbackPage /> },
  { path: ROUTE_PATH.API_CHECK, element: <ApiHealthCheck /> },
];

const PROTECTED_ROUTES = [
  { path: ROUTE_PATH.PROJECT, element: <ProjectPage /> },
  { path: ROUTE_PATH.MYTASK, element: <MyTaskPage /> },
  { path: ROUTE_PATH.AVATAR, element: <AvatarPickerPage /> },
  { path: ROUTE_PATH.TASK_DETAIL, element: <TaskDetailPage /> },
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
