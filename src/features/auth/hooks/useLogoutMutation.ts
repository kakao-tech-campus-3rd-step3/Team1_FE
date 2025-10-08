import { useMutation } from '@tanstack/react-query';
import { fetchLogout } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/features/auth/store/authStore';
import toast from 'react-hot-toast';

export const useLogoutMutation = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      clearAuth();
      toast.success("로그아웃 되었습니다.")
    },
  });
};
