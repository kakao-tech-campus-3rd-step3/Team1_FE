import { useAuthStore } from '@/features/auth/store/authStore';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // TODO: 로그인 API 연동 후 아래 주석을 풀 것입니다.
  const { accessToken } = useAuthStore();
  const location = useLocation(); // 현재 URL 정보 가져오기

  // accessToken 없으면 로그인 페이지로 이동, 이동 전 원래 위치 저장
  //TODO: 로그인 API 연동 후 아래 주석을 풀 것입니다.
  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
