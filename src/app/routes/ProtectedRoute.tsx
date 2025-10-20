import { useAuthStore } from '@/features/auth/store/authStore';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // TODO: 로그인 API 연동 후 아래 주석을 풀 것입니다.
  const { accessToken, isInitializing } = useAuthStore();
  const location = useLocation();
  if (isInitializing) {
    return <div>로딩 중 ...</div>;
  }
  if (!isInitializing && !accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
