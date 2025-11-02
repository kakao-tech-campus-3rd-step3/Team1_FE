import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { updateTaskSchema, type UpdateTaskInput } from '@/features/task/schemas/taskSchema';
import { useModal } from '@/shared/hooks/useModal';
import { useProjectMembersQuery } from '@/features/project/hooks/useProjectMembersQuery';
import type { TaskDetail } from '@/features/task/types/taskTypes';
import type { Status } from '@/features/board/types/boardTypes';

export const useUpdateTaskForm = (
  projectId: string,
  task: TaskDetail,
  onConfirm: (data: UpdateTaskInput) => Promise<void> | void,
) => {
  const { resetModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const { data: projectMembers = [] } = useProjectMembersQuery(projectId);

  const form = useForm<UpdateTaskInput>({
    resolver: zodResolver(updateTaskSchema),
    mode: 'onChange',
    defaultValues: {
      title: task.title,
      description: task.description ?? '',
      requiredReviewerCount: task.requiredReviewerCount ?? 0,
      assignees: task.assignees.map((a) => a.name),
      dueDate: task.dueDate,
      status: (task.status ?? 'TODO') as Status,
      tags: task.tags?.map((t) => t.tagId) || [],
      urgent: task.urgent ?? false,
    },
  });

  const handleConfirm = form.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const assigneeIds: string[] = data.assignees
        .map((name) => projectMembers.find((m) => m.name === name)?.id)
        .filter((id): id is string => !!id);

      const payload: UpdateTaskInput = {
        ...data,
        assignees: assigneeIds,
      };

      await onConfirm(payload);
      form.reset(data);
      resetModal();
    } finally {
      setIsLoading(false);
    }
  });

  return { form, handleConfirm, isLoading };
};
