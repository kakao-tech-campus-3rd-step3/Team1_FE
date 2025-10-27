import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from '@/app/routes/ProtectedRoute';
import AppLayout from '@/app/layout/AppLayout';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import MyTaskPage from '@/pages/MyTaskPage';
import ProjectPage from '@/pages/ProjectPage';
import MyInfoPage from '@/pages/MyInfoPage';
import ServerErrorPage from '@/pages/ServerErrorPage';
import TaskDetailPage from '@/pages/TaskDetailPage';
import AvatarPickerPage from '@/pages/AvatarPickerPage';
import KakaoCallbackPage from '@/pages/KakaoCallbackPage';
import ApiHealthCheck from '@/features/health-check/ApiHealthCheck';
import AlarmSetupPage from '@/pages/AlarmSetupPage';
import AlarmPermissionPage from '@/pages/AlarmPermissionPage';
import BoardSection from '@/features/board/components/BoardSection';
import MemoSection from '@/features/memo/components/MemoSection';
import FileSection from '@/features/file/components/FileSection';
import AiTransformTestPage from '@/pages/AiTransformTestPage';

export const ROUTE_PATH = {
  MAIN: '/',
  LOGIN: '/login',
  PROJECT: '/project/:projectId',
  PROJECT_BOARD: '/project/:projectId/board',
  PROJECT_MEMO: '/project/:projectId/memo',
  PROJECT_FILE: '/project/:projectId/file',
  MY_TASK: '/my-task',
  ERROR: '/error',
  AVATAR: '/avatar',
  CALLBACK: '/auth/callback',
  API_CHECK: '/health',
  TASK_DETAIL: '/project/:projectId/tasks/:taskId',
  MY_INFO: '/my-info',
  ALARM_SETUP: '/alarm/setup',
  ALARM_SETUP_MOBILE: '/alarm/permission',
  AI_TEST: '/ai-test',
};

const PUBLIC_ROUTES = [
  { path: ROUTE_PATH.MAIN, element: <LandingPage /> },
  { path: ROUTE_PATH.LOGIN, element: <LoginPage /> },
  { path: ROUTE_PATH.ERROR, element: <ServerErrorPage /> },
  { path: ROUTE_PATH.CALLBACK, element: <KakaoCallbackPage /> },
  { path: ROUTE_PATH.API_CHECK, element: <ApiHealthCheck /> },
];

const PROTECTED_ROUTES = [
  {
    path: ROUTE_PATH.PROJECT,
    element: <ProjectPage />,
    children: [
      { path: 'board', element: <BoardSection type="project" /> },
      { path: 'file', element: <FileSection /> },
      { path: 'memo', element: <MemoSection /> },
    ],
  },
  { path: ROUTE_PATH.MY_TASK, element: <MyTaskPage /> },
  { path: ROUTE_PATH.TASK_DETAIL, element: <TaskDetailPage /> },
  { path: ROUTE_PATH.MY_INFO, element: <MyInfoPage /> },
  { path: ROUTE_PATH.AI_TEST, element: <AiTransformTestPage /> }, // 📍 TODO: AI 변환 모달 구현 후 지워주세요.
];

const PROTECTED_ROUTES_NO_LAYOUT = [
  { path: ROUTE_PATH.AVATAR, element: <AvatarPickerPage /> },
  { path: ROUTE_PATH.ALARM_SETUP, element: <AlarmSetupPage /> },
  { path: ROUTE_PATH.ALARM_SETUP_MOBILE, element: <AlarmPermissionPage /> },
];

export const router = createBrowserRouter([
  // 공개 라우트
  ...PUBLIC_ROUTES,

  // 사이드바 없는 보호 라우트
  ...PROTECTED_ROUTES_NO_LAYOUT.map((route) => ({
    ...route,
    element: <ProtectedRoute>{route.element}</ProtectedRoute>,
  })),
  // ...PROTECTED_ROUTES_NO_LAYOUT, // 보호 라우트 해제 (테스트용) -> 주석 풀면 이것도 지워주세요

  {
    path: '/',
    element: <AppLayout />,
    children: [
      // 보호된 라우트
      ...PROTECTED_ROUTES.map((route) => ({
        ...route,
        element: <ProtectedRoute>{route.element}</ProtectedRoute>,
      })),
      // ...PROTECTED_ROUTES, // 보호 라우트 해제 (테스트용) -> 주석 풀면 이것도 지워주세요
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
