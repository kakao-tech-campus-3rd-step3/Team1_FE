import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '../api/settingsApi';

export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: settingsApi.getMyInfo,
  });
};
