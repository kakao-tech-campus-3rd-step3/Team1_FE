// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import type { AvatarInfo } from '@/features/user/types/userTypes';
// import { settingsApi } from '@/features/settings/api/settingsApi';

// export const useAvatarSaveMutation = () => {
//   const queryClient = useQueryClient();
//   return useMutation<void, Error, AvatarInfo>({
//     mutationFn: async ({ avatar, backgroundColor }) => {
//       await settingsApi.updateAvatar({ avatar: avatar, backgroundColor });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['myInfo'] });
//     },
//   });
// };
