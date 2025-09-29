import useModalStore from '@/shared/store/useModalStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/shadcn/dialog';
import { ModalButtons } from '@/shared/components/modal/ModalButtons';

const ModalRenderer = () => {
  const { stack, resetModal } = useModalStore();
  const current = stack[stack.length - 1];
  if (!current) return null;

  return (
    <Dialog open={!!current} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-[425px] border-gray-300">
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
