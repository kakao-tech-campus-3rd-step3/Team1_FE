import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { createTaskSchema, type CreateTaskInput } from '@/features/task/schemas/taskSchema';
import { useModal } from '@/shared/hooks/useModal';
import { useProjectMembersQuery } from '@/features/project/hooks/useProjectMembersQuery';
import { useProjectStore } from '@/features/project/store/useProjectStore';

export const useCreateTaskForm = (
  initialProjectId: string,
  onConfirm: (data: CreateTaskInput) => Promise<void> | void,
) => {
  const { resetModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const projectData = useProjectStore((state) => state.projectData);

  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      requiredReviewerCount: projectData.defaultReviewerCount,
      assignees: [],
      dueDate: '',
      status: 'TODO',
      tags: [],
      urgent: false,
      projectId: initialProjectId,
    },
  });

  const selectedProjectId = form.watch('projectId');
  const { data: projectMembers = [] } = useProjectMembersQuery(selectedProjectId || '');

  const handleConfirm = form.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const assigneeIds: string[] = data.assignees
        .map((name) => projectMembers.find((m) => m.name === name)?.id)
        .filter((id): id is string => !!id);

      const payload = {
        ...data,
        assignees: assigneeIds,
      };

      await onConfirm(payload);
      resetModal();
      form.reset();
    } finally {
      setIsLoading(false);
    }
  });

  return {
    form,
    handleConfirm,
    isLoading,
  };
};
