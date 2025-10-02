import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { taskSchema, type CreateTaskInput } from '@/features/task/schemas/taskSchema';
import { useModal } from '@/shared/hooks/useModal';

export const useTaskForm = (onConfirm: (data: CreateTaskInput) => Promise<void> | void) => {
  const { resetModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      reviewCount: 0,
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
      await onConfirm(data);
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
