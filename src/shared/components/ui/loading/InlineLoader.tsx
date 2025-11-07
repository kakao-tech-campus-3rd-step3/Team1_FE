import { cn } from '@/shared/lib/utils';
import { Loader2 } from 'lucide-react';

interface InlineLoaderProps {
  size?: number;
  className?: string;
}

const InlineLoader = ({ size = 6, className = '' }: InlineLoaderProps) => {
  const dimension = `w-${size} h-${size}`;
  return (
    <div className={cn('flex justify-center py-4', className)}>
      <Loader2 className={cn(dimension, 'animate-spin text-gray-500')} />
    </div>
  );
};

export default InlineLoader;
