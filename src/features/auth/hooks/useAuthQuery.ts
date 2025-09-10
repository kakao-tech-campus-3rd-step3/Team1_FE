import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { fetchLogout } from '../api/authApi';

// export const useLoginQuery = () => {
//     const setAuth = useAuthStore((state) => state.setAuth);
//     return  useMutation({
//         mutationFn:kakaoLoginCallback,
//         onSuccess: (data) => {
//             setAuth(data.user, data.accessToken);
//         }
//     });}

export const useLogoutQuery = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      clearAuth();
    },
  });
};
