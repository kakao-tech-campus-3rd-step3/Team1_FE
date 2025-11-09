import { DropdownMenuItem } from '@/shared/components/shadcn/dropdown-menu';
import { Bell, Check } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import { cn } from '@/shared/lib/utils';
import type { NotificationItem } from '@/features/notifications/types/NotificationsType';

export interface NotificationListItemProps {
  notification: NotificationItem;
  onMarkAsRead: (id: string) => void;
}

const NotificationListItem = ({ notification, onMarkAsRead }: NotificationListItemProps) => {
  const n = notification;

  return (
    <DropdownMenuItem
      className={cn(
        'group relative p-3 transition-colors m-1 rounded-xl',
        'hover:bg-transparent focus:bg-transparent',
        !n.read && 'bg-blue-50 hover:bg-blue-50 focus:bg-blue-50',
      )}
    >
      <div className="flex gap-3 w-full">
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 mr-1">
          <Bell className="w-5 h-5 text-boost-blue" />
        </div>

        <div className="flex-1 min-w-0">
          <p className={cn('body2-bold', n.read ? 'text-gray-500/70' : 'text-gray-800')}>
            {n.title}
          </p>

          <p className={cn('text-xs mb-1', n.read ? 'text-gray-500/70' : 'text-gray-700')}>
            {n.message}
          </p>

          <p className="text-xs text-gray-500/60">
            {new Date(n.createdAt).toLocaleString('ko-KR', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>

      {!n.read && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:bg-blue-100 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onMarkAsRead(n.id);
          }}
        >
          <Check className="h-4 w-4 text-boost-blue" />
        </Button>
      )}
    </DropdownMenuItem>
  );
};

export default NotificationListItem;
