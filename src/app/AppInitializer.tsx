import { useEffect } from 'react';
import { fetchRefreshToken } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/features/auth/store/authStore';
import SplashScreen from '@/pages/SplashScreen';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const { setAuth, clearAuth, isInitializing, setIsInitializing } = useAuthStore();

  useEffect(() => {
    const pathname = window.location.pathname;
    const publicPaths = ['/', '/login', '/error', '/auth/callback'];
    const isPublic = publicPaths.includes(pathname);

    if (isPublic) {
      setIsInitializing(false);
      return;
    }

    const init = async () => {
      try {
        const { accessToken } = await fetchRefreshToken();
        setAuth({ token: accessToken });
      } catch (error) {
        console.error('Refresh token expired:', error);
        clearAuth();
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, [setAuth, clearAuth, setIsInitializing]);

  if (isInitializing) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export default AppInitializer;
