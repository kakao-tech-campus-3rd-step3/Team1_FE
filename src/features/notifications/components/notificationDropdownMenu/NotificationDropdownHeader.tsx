import { DropdownMenuLabel } from '@/shared/components/shadcn/dropdown-menu';
import { Button } from '@/shared/components/shadcn/button';

export interface NotificationDropdownHeaderProps {
  unreadCount?: number;
  onMarkAll: () => void;
}

const NotificationDropdownHeader = ({
  unreadCount,
  onMarkAll,
}: NotificationDropdownHeaderProps) => {
  return (
    <DropdownMenuLabel className="flex items-center justify-between py-3 px-4">
      <span className="text-base font-semibold">알림</span>

      {unreadCount ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">안읽음 {unreadCount}</span>
          <Button onClick={onMarkAll}>모두 읽음</Button>
        </div>
      ) : null}
    </DropdownMenuLabel>
  );
};

export default NotificationDropdownHeader;
