import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';

export interface BackButtonProps {
  onBack?: () => void;
  to?: string;
  className?: string;
}

const BackButton = ({ onBack, to, className }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        onBack?.();
        if (to) {
          navigate(to);
        } else {
          navigate(-1);
        }
      }}
      className={cn('inline-flex items-center justify-center p-1 cursor-pointer', className)}
    >
      <ChevronLeft size={26} strokeWidth={1.5} />
    </button>
  );
};

export default BackButton;
