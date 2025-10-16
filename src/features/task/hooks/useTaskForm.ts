import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { taskSchema, type CreateTaskInput } from '@/features/task/schemas/taskSchema';
import { useModal } from '@/shared/hooks/useModal';
import { mockMembers } from '@/shared/data/mockMembers';

export const useTaskForm = (onConfirm: (data: CreateTaskInput) => Promise<void> | void) => {
  const { resetModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      requiredReviewerCount: 0,
      assignees: [],
      dueDate: '',
      status: 'TODO',
      tags: [],
      urgent: false,
    },
  });

  const handleConfirm = form.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const assigneeIds = data.assignees
        .map((name) => mockMembers.find((m) => m.name === name)?.id)
        .filter(Boolean) as string[];

      const payload = {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate,
        urgent: data.urgent,
        requiredReviewerCount: data.requiredReviewerCount,
        tags: data.tags,
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
