import { cn } from '@/shared/lib/utils';
import { Loader2 } from 'lucide-react';

interface FullPageLoaderProps {
  text?: string;
  className?: string;
}

const FullPageLoader = ({ text, className = '' }: FullPageLoaderProps) => {
  return (
    <div className={cn('flex flex-col justify-center items-center h-full w-full', className)}>
      <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      {text && <p className="mt-3 text-gray-500 label1-regular">{text}</p>}
    </div>
  );
};

export default FullPageLoader;
