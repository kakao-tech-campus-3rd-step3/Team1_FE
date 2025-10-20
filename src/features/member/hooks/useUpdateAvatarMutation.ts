import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memberApi } from '@/features/member/api/memberApi';
import toast from 'react-hot-toast';

interface UpdateMemberVariables {
  name?: string;
  avatar?: string;
}

export const useUpdateAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateMemberVariables) => {
      //TODO: 아바타 설정 API 교체 예정
      const updated = await memberApi.updateMemberInfo(data);
      return updated;
    },
    onSuccess: () => {
      toast.success('회원 정보가 저장되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
    onError: () => {
      toast.error('회원 정보 변경에 실패했습니다.');
    },
  });
};