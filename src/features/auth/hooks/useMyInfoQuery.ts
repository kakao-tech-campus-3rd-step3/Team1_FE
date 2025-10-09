import {  useQuery } from '@tanstack/react-query';
import { fetchMyInfo } from '@/features/auth/api/authApi';

export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: fetchMyInfo,
  });
};
