import { Button } from '@/shared/components/shadcn/button';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import { Input } from '@/shared/components/shadcn/input';
import { Textarea } from '@/shared/components/shadcn/textarea';
import { FormField } from '@/shared/components/ui/Form/FormField';
import { useModal } from '@/shared/hooks/useModal';
import { toggleArrayItem } from '@/shared/utils/arrayUtils';
import { cn } from '@/shared/lib/utils';
import { Calendar, User, Tag, Siren, FileText, Loader, Check, NotebookPen } from 'lucide-react';
import StatusButtons from '@/features/task/components/TaskCreateModalContent/StatusButtons';
import UrgentToggle from '@/features/task/components/TaskCreateModalContent/UrgentToggle';
import AssigneeDropdown from '@/features/task/components/TaskCreateModalContent/AssigneeDropdown';
import TagInput from '@/features/task/components/TaskCreateModalContent/TagInput';
import { useTaskForm } from '@/features/task/hooks/useTaskForm';
import type { CreateTaskInput } from '@/features/task/schemas/taskSchema';
import { statusList } from '@/features/board/types/boardTypes';

interface TaskCreateModalContentProps {
  onConfirm: (taskData: CreateTaskInput) => Promise<void> | void;
}

const TaskCreateModalContent = ({ onConfirm }: TaskCreateModalContentProps) => {
  const inputClasses = 'hover:bg-gray-200 focus:ring-transparent h-11 label2-regular';
  const { resetModal } = useModal();
  const { form, handleConfirm, isLoading } = useTaskForm(onConfirm);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const assignees = watch('assignees');
  const tags = watch('tags') || [];
  const status = watch('status');
  const urgent = watch('urgent') || false;

  return (
    <>
      <div className="flex flex-col gap-8 py-4 max-h-[400px] overflow-y-auto px-1">
        {/* 할 일 제목 */}
        <FormField icon={FileText} required label="제목" error={errors.title?.message}>
          <Input
            {...register('title')}
            placeholder="예: 로그인 페이지 UI 구현하기"
            className={inputClasses}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 진행 상태 */}
          <FormField icon={Loader} required label="진행 상태" error={errors.status?.message}>
            <StatusButtons
              statusList={statusList}
              selectedStatus={status}
              setStatus={(s) => setValue('status', s)}
            />
          </FormField>

          {/* 긴급 여부 */}
          <FormField icon={Siren} label="긴급 여부">
            <UrgentToggle urgent={urgent} setUrgent={(v) => setValue('urgent', v)} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 담당자 */}
          <FormField icon={User} required label="담당자" error={errors.assignees?.message}>
            <AssigneeDropdown
              assignees={assignees}
              toggleAssignee={(name) =>
                setValue('assignees', toggleArrayItem(assignees, name), { shouldValidate: true })
              }
            />
          </FormField>

          {/* 마감일 */}
          <FormField icon={Calendar} required label="마감일" error={errors.dueDate?.message}>
            <Input type="date" {...register('dueDate')} className={inputClasses} />
          </FormField>
        </div>

        {/* 필요한 검토 수 */}
        <FormField icon={Check} label="필요한 검토 수" error={errors.reviewCount?.message}>
          <Input
            type="number"
            min={0}
            {...register('reviewCount', { valueAsNumber: true })}
            className={inputClasses}
          />
        </FormField>

        {/* 상세 설명 */}
        <FormField icon={NotebookPen} label="상세 설명" error={errors.description?.message}>
          <Textarea
            {...register('description')}
            placeholder="할 일에 대한 상세 설명을 입력하세요"
            className={cn('!h-25', inputClasses)}
          />
        </FormField>

        {/* 태그 */}
        <FormField icon={Tag} label="태그" error={errors.tags?.message}>
          <TagInput
            tags={tags}
            setTags={(tags) => setValue('tags', tags, { shouldValidate: true })}
          />
        </FormField>
      </div>

      {/* 하단 버튼 영역 (취소, 생성) */}
      <DialogFooter className="gap-2 pt-4 border-t border-gray-300">
        <Button
          onClick={() => resetModal()}
          variant="outline"
          disabled={isLoading}
          className="px-6 border-gray-400"
        >
          취소
        </Button>
        <Button
          onClick={handleConfirm}
          className="px-6 bg-boost-blue hover:boost-blue-hover"
          // TODO: disabled 처리를 할지, error 메세지를 보여줄지 고민 중입니다!
          // disabled={isLoading || !form.formState.isValid}
        >
          {isLoading ? '생성 중...' : '할 일 생성'}
        </Button>
      </DialogFooter>
    </>
  );
};

export default TaskCreateModalContent;
