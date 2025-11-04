import { useDropzone } from 'react-dropzone';
import { useUploadFileMutation } from '@/features/task-detail/hooks/useFileUploadUrlMutation';

export const useFileUploader = (taskId: string) => {
  const uploadMutation = useUploadFileMutation();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      uploadMutation.mutate({ file, taskId });
    });
  };

  const dropzoneProps = useDropzone({ onDrop });

  return { ...dropzoneProps };
};
