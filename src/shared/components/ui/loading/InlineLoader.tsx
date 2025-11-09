import { cn } from '@/shared/lib/utils';
import { Loader2 } from 'lucide-react';

interface InlineLoaderProps {
  size?: number;
  className?: string;
  text?: string;
}

const InlineLoader = ({ size = 6, className = '', text }: InlineLoaderProps) => {
  const dimension = `w-${size} h-${size}`;
  return (
    <div className={cn('flex flex-col items-center py-4', className)}>
      <Loader2 className={cn(dimension, 'animate-spin text-gray-500')} />
      {text && <p className="text-gray-500 text-sm mt-2 text-center">{text}</p>}
    </div>
  );
};

export default InlineLoader;
