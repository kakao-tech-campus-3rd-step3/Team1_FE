import { useMutation } from '@tanstack/react-query';
import { webPushApi } from '@/features/notifications/api/webPushApi';
import type { CreatePushSessionResponse } from '@/features/notifications/types/pushApiTypes';

export const useCreatePushSessionMutation = (options?: {
  onSuccess?: (res: CreatePushSessionResponse) => void;
  onError?: (err: unknown) => void;
}) => {
  return useMutation<CreatePushSessionResponse, Error, void>({
    mutationFn: webPushApi.createSession,
    ...options,
  });
};
