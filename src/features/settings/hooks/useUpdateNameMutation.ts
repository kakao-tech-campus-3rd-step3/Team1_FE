import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/features/settings/api/settingsApi';
import toast from 'react-hot-toast';
import type { MyInfoResponse } from '@/features/settings/types/settingsTypes';

export const useUpdateNameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, { previousMyInfo?: MyInfoResponse }>({
    mutationFn: (name) => settingsApi.updateName(name),

    onMutate: async (newName) => {
      await queryClient.cancelQueries({ queryKey: ['myInfo'] });
      const previousMyInfo = queryClient.getQueryData<MyInfoResponse>(['myInfo']);

      if (previousMyInfo) {
        queryClient.setQueryData<MyInfoResponse>(['myInfo'], {
          ...previousMyInfo,
          name: newName,
        });
      }

      return { previousMyInfo };
    },

    onError: (_error, _newName, context) => {
      if (context?.previousMyInfo) {
        queryClient.setQueryData(['myInfo'], context.previousMyInfo);
      }
      toast.error('이름 변경에 실패했습니다.');
    },

    onSuccess: () => {
      toast.success('이름이 변경되었습니다!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });
};
