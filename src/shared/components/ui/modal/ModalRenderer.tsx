import useModalStore from '@/shared/store/useModalStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/shadcn/dialog';
import { ModalButtons } from '@/shared/components/ui/modal/ModalButtons';
import { ModalSize } from '@/shared/types/modalTypes';
import { cn } from '@/shared/lib/utils';

const ModalRenderer = () => {
  const { stack, resetModal } = useModalStore();
  const current = stack[stack.length - 1];
  if (!current) return null;

  const modalSize = ModalSize[current.size || 'md'];

  return (
    <Dialog open={!!current} onOpenChange={resetModal}>
      <DialogContent className={cn('border-gray-300', modalSize)}>
        <DialogHeader className="mb-0">
          <DialogTitle>{current.title}</DialogTitle>
          {current.description && (
            <DialogDescription className="label2-regular">{current.description}</DialogDescription>
          )}
        </DialogHeader>
        {current.content}
        {current.buttons && <ModalButtons buttons={current.buttons} />}
      </DialogContent>
    </Dialog>
  );
};

export default ModalRenderer;
