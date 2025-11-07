import { useMutation } from '@tanstack/react-query';
import { webPushApi } from '@/features/webpush/api/webPushApi';
import type { CreatePushSessionResponse } from '@/features/settings/types/pushApiTypes';

export const useCreatePushSessionMutation = (options?: {
  onSuccess?: (res: CreatePushSessionResponse) => void;
  onError?: (err: unknown) => void;
}) => {
  return useMutation<CreatePushSessionResponse, Error, void>({
    mutationFn: webPushApi.createSession,
    ...options,
  });
};
