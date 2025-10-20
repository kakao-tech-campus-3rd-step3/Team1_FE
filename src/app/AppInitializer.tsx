import { useEffect } from 'react';
import { fetchRefreshToken } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/features/auth/store/authStore';

const AppInitializer = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setIsInitializing = useAuthStore((state) => state.setIsInitializing);
  useEffect(() => {
    const pathname = window.location.pathname;
    const publicPaths = ['/', '/login', '/error', '/auth/callback'];
    const isPublic = publicPaths.includes(pathname);
    if (isPublic) {
      setIsInitializing(false);
      return;
    }
    const refreshAccessToken = async () => {
      try {
        const { newAccessToken } = await fetchRefreshToken();

        setAuth({ token: newAccessToken });
      } catch (error) {
        console.error('Refresh token expired:', error);
        clearAuth();
      } finally {
        setTimeout(() => {
          setIsInitializing(false);
        }, 500);
      }
    };

    refreshAccessToken();
  }, [setAuth, clearAuth, setIsInitializing]);

  return null;
};

export default AppInitializer;
