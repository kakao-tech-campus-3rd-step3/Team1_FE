import { useMutation } from '@tanstack/react-query';
import { settingsApi } from '@/features/settings/api/settingsApi';
import { useAuthStore } from '@/features/auth/store/authStore';
import toast from 'react-hot-toast';

export const useDeleteAccountMutation = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return useMutation({
    mutationFn: settingsApi.deleteAccount,
    onSuccess: () => {
      toast.success('회원 탈퇴되었습니다.');
      clearAuth();
    },
  });
};
