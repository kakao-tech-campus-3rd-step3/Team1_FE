import { useMutation } from '@tanstack/react-query';
import { fetchLogout } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/features/auth/store/authStore';

export const useLogoutMutation = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      clearAuth();
    },
  });
};
