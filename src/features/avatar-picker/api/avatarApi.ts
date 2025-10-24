import api from '@/shared/api/axiosInstance';

export const avatarApi = {
  uploadAvatar: async (avatar: string) => {
    await api.put('/members/me/avatar', { avatar });
  },
};
