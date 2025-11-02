import { z } from 'zod';

export const createTaskSchema = z.object({
  projectId: z.string(),
  title: z.string().min(1, '제목은 필수입니다.'),
  description: z.string().optional(),
  requiredReviewerCount: z
    .number({ error: '숫자를 입력해주세요' })
    .min(0, '검토 수는 0 이상이어야 합니다.')
    .optional(),
  assignees: z.array(z.string()).min(1, '담당자를 선택하세요.'),
  dueDate: z.string().min(1, '마감일은 필수입니다.'),
  status: z.enum(['TODO', 'PROGRESS', 'REVIEW', 'DONE']),
  tags: z.array(z.string()).optional(),
  urgent: z.boolean().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = createTaskSchema.extend({
  projectId: z.string().optional(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
