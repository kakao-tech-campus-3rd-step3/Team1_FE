import { useMutation } from '@tanstack/react-query';
import { fetchLogout } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export const useLogoutMutation = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      clearAuth();
    },
  });
};
