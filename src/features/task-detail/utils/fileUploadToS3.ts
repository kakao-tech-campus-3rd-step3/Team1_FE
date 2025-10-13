import api from '@/shared/api/axiosInstance';

export const uploadToS3 = async (file: File, url: string, headers: Record<string, string>) => {
  await api.put(url, file , {headers});
};
