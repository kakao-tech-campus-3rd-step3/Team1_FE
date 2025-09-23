import { Button } from '@/shared/components/shadcn/button';
import { Loader2 } from 'lucide-react';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import useModalStore from '@/shared/store/useModalStore';
import type { ModalButton } from '@/shared/types/modalTypes';

interface ModalButtonsProps {
  buttons: ModalButton[];
}

export function ModalButtons({ buttons }: ModalButtonsProps) {
  const { isLoading, setLoading } = useModalStore();

  const handleClick = async (onClick: () => void | Promise<void>) => {
    setLoading(true);

    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogFooter className="flex gap-2 mt-4">
      {buttons.map((btn) => (
        <Button
          key={btn.text}
          onClick={() => handleClick(btn.onClick)}
          disabled={btn.disabled || isLoading}
          className="flex-1"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {btn.text}
        </Button>
      ))}
    </DialogFooter>
  );
}
