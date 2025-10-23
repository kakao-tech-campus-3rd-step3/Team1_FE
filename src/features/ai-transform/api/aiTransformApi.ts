import api from '@/shared/api/axiosInstance';
import type {
  AiTransformRequest,
  AiTransformResponse,
} from '@/features/ai-transform/types/aiTransformTypes';

export const aiTransformApi = {
  commentTransform: async (body: AiTransformRequest): Promise<AiTransformResponse> => {
    const { data } = await api.post('/ai/comments/transform', body);
    return data;
  },
};
