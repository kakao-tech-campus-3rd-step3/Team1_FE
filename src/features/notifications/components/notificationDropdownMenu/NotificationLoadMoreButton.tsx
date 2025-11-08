import { Button } from '@/shared/components/shadcn/button';
import InlineLoader from '@/shared/components/ui/loading/InlineLoader';

export interface NotificationLoadMoreButtonProps {
  isFetching: boolean;
  onClick: () => void;
}

const NotificationLoadMoreButton = ({ isFetching, onClick }: NotificationLoadMoreButtonProps) => {
  return (
    <div className="p-2 border-t border-gray-200">
      <Button
        variant="ghost"
        className="w-full text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        onClick={onClick}
        disabled={isFetching}
      >
        {isFetching ? <InlineLoader size={4}/> : '더 보기'}
      </Button>
    </div>
  );
};

export default NotificationLoadMoreButton;
