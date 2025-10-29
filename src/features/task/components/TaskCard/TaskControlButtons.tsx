import { Pencil, Trash2 } from 'lucide-react';
import { ButtonGroup } from '@/shared/components/shadcn/button-group';
import { Button } from '@/shared/components/shadcn/button';
import { useTaskModals } from '@/features/task/hooks/useTaskModals';

interface TaskControlButtonsProps {
  onClickDelete: () => void;
}

const TaskControlButtons = ({ onClickDelete }: TaskControlButtonsProps) => {
  const { showDeleteTaskModal } = useTaskModals();
  const buttonClass =
    'border-boost-blue/50 text-boost-blue/70 hover:text-boost-blue hover:bg-boost-blue/10 w-7 h-7 cursor-pointer rounded-md';

  return (
    <ButtonGroup className="absolute z-10 right-0 top-1">
      <Button
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          // 📍TODO: 할 일 수정 기능 구현 이후 추가 필요
        }}
        className={buttonClass}
      >
        <Pencil />
      </Button>

      <Button
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          showDeleteTaskModal(onClickDelete);
        }}
        className={buttonClass}
      >
        <Trash2 />
      </Button>
    </ButtonGroup>
  );
};

export default TaskControlButtons;
