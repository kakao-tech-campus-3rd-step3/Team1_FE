import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileUploadApi } from '../api/fileUploadApi';
import type { FileStatus, TaskDetailFileType } from '../types/taskDetailFileType';
import { uploadToS3 } from '../utils/fileUploadToS3';

export const useUploadFileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, taskId }: { file: File; taskId: string }) => {
      const presigned = await fileUploadApi.fetchFileUploadUrl({
        filename: file.name,
        contentType: file.type,
        sizeBytes: file.size,
      });
      console.log(presigned);
      await uploadToS3(file, presigned.url, presigned.headers);
      await fileUploadApi.completeFileUpload({
        fileId: presigned.fileId,
        taskId,
        filename: file.name,
        contentType: file.type,
        sizeBytes: file.size,
      });
      return { fileId: presigned.fileId };
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['uploadedFile'] });
      const prevFiles = queryClient.getQueriesData({ queryKey: ['uploadedFile'] });
      const tempId = Date.now().toString();
      const newFile: TaskDetailFileType = {
        fileId: tempId,
        fileName: variables.file.name,
        fileUrl: '',
        fileSize: `${(variables.file.size / 1024 / 1024).toFixed(2)} MB`,
        timeLeft: '방금',
        status: 'uploading' as FileStatus,
        onOpenPdf: (url?: string) => window.open(url, '_blank'),
        onDelete: () => console.log('삭제', variables.file.name),
        onDownload: () => {},
      };
      queryClient.setQueryData(['uploadedFile'], (old: TaskDetailFileType[] = []) => [
        ...old,
        newFile,
      ]);

      return { prevFiles, tempId };
    },
    onSuccess: async (data, variables, context) => {
      queryClient.setQueryData(['uploadedFile'], (old: TaskDetailFileType[]) =>
        old?.map((file) =>
          file.fileId === context?.tempId
            ? {
                ...file,
                status: 'completed',
                fileId: data.fileId,
              }
            : file,
        ),
      );
    },
  });
};
