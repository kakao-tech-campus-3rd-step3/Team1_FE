import { useMutation } from '@tanstack/react-query';
import { fetchFileDownloadUrl } from '@/features/file/api/fileDownloadApi';
import { downloadFromS3 } from '@/features/file/utils/fileDownloadUtil';
import toast from 'react-hot-toast';

export const useFileDownloadMutation = () => {
  return useMutation({
    mutationFn: async ({ fileId, fileName }: { fileId: string; fileName: string }) => {
      const presigned = await fetchFileDownloadUrl(fileId);
      //다운로드
      await downloadFromS3(presigned.url, presigned.headers, fileName);
    },
    onSuccess: () => {
      toast.success('파일이 다운로드 되었습니다.');
    },
    onError: () => {
      toast.error('파일 다운로드에 실패했습니다.');
    },
  });
};
