import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileUploadApi } from '@/features/task-detail/api/fileUploadApi';
import type {
  FileStatus,
  TaskDetailFileType,
} from '@/features/task-detail/types/taskDetailFileType';
import { uploadToS3 } from '@/features/task-detail/utils/fileUploadUtil';
import toast from 'react-hot-toast';
import { formatBytes } from '@/features/file/utils/fileUtils';
import { v4 as uuidv4 } from 'uuid';
import { fetchFileDownloadUrl } from './../../file/api/fileDownloadApi';

export const useUploadFileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, taskId }: { file: File; taskId: string }) => {
      // 1️⃣ presigned URL 요청

      const presigned = await fileUploadApi.fetchFileUploadUrl({
        filename: file.name,
        contentType: file.type,
        sizeBytes: file.size,
      });
      // 2️⃣ S3에 실제 업로드

      await uploadToS3(file, presigned.url, presigned.headers);
      // 3️⃣ 업로드 완료 콜백 (서버에 알림)

      await fileUploadApi.completeFileUpload({
        fileId: presigned.fileId,
        taskId,
        filename: file.name,
        contentType: file.type,
        sizeBytes: file.size,
      });
      // 4️⃣ ✅ 다운로드 URL 요청

      const downloadUrlRes = await fetchFileDownloadUrl(presigned.fileId);
      console.log(downloadUrlRes);
      return { fileId: presigned.fileId, downloadUrl: downloadUrlRes.url };
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['uploadedFile'] });
      const prevFiles = queryClient.getQueriesData({ queryKey: ['uploadedFile'] });
      const tempId = uuidv4();
      const newFile: TaskDetailFileType = {
        fileId: tempId,
        fileName: variables.file.name,
        fileUrl: '',
        fileSize: formatBytes(variables.file.size),
        timeLeft: '방금',
        status: 'uploading' as FileStatus,
      };
      queryClient.setQueryData(['uploadedFile'], (old: TaskDetailFileType[] = []) => [
        ...old,
        newFile,
      ]);

      return { prevFiles, tempId };
    },
    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData(['uploadedFile'], (old: TaskDetailFileType[]) =>
        old?.map((file) =>
          file.fileId === context?.tempId
            ? {
                ...file,
                status: 'success',
                fileId: data.fileId,
                fileUrl: data.downloadUrl,
              }
            : file,
        ),
      );
    },
    onError: (error: Error, _variables, context) => {
      toast.error('파일 업로드에 실패했습니다.');
      console.log(error);
      if (context?.prevFiles) queryClient.setQueryData(['uploadedFile'], context?.prevFiles);
    },
  });
};
