import { useEffect } from 'react';
import { fetchRefreshToken } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/features/auth/store/authStore';

const AppInitializer = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const pathname = window.location.pathname;
    const publicPaths = ['/', '/login', '/error', '/auth/callback'];
    const isPublic = publicPaths.includes(pathname);
    if (isPublic) {
      return;
    }
    const refreshAccessToken = async () => {
      try {
        const { newAccessToken } = await fetchRefreshToken();
        setAuth({ token: newAccessToken });
      } catch (error) {
        console.error('Refresh token expired:', error);
        clearAuth();
      }
    };

    refreshAccessToken();
  }, [setAuth, clearAuth]);

  return null;
};

export default AppInitializer;
