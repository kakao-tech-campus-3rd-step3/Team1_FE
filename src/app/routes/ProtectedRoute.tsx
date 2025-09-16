import { useAuthStore } from '@/features/auth/store/authStore'
import type { ReactNode } from 'react';
import { Navigate } from 'react-router'


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken } = useAuthStore();
  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute
