import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/shared/components/shadcn/dropdown-menu';
import { Bell, Check } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import { cn } from '@/shared/lib/utils';
import type { NotificationItem } from '@/features/notifications/types/NotificationsType';
import { useMarkNotificationAsReadMutation } from '@/features/notifications/hooks/useMarkNotificationAsReadMutation';
import { useNotificationCountsQuery } from '@/features/notifications/hooks/useNotificationCountsQuery';
import { useMarkAllNotificationAsRead } from '@/features/notifications/hooks/useMarkAllNotificationAsRead';

interface NotificationDropdownMenuProps {
  notifications: NotificationItem[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

const NotificationDropdownMenu = ({
  notifications,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: NotificationDropdownMenuProps) => {
  const { data: notificationCountData } = useNotificationCountsQuery();
  const { mutate: markAsRead } = useMarkNotificationAsReadMutation();
  const { mutate: markAllAsRead } = useMarkAllNotificationAsRead();
  const handleMarkAsRead = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    markAsRead(id);
  };

  return (
    <DropdownMenuContent
      side="right"
      align="start"
      sideOffset={16}
      className="w-96 h-[450px] border border-gray-300 bg-white shadow-lg rounded-md flex flex-col"
    >
      {/* 헤더 */}
      <DropdownMenuLabel className="flex items-center justify-between py-3 px-4">
        <span className="text-base font-semibold">알림</span>
        {notificationCountData?.unreadCount ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              안읽음 {notificationCountData.unreadCount}
            </span>
            <Button onClick={() => markAllAsRead()}>모두 읽음</Button>
          </div>
        ) : null}
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      {/* 알림 리스트 */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Bell className="h-12 w-12 mb-3 opacity-20" />
            <p className="text-sm">새로운 알림이 없습니다</p>
          </div>
        ) : (
          <div className="py-1">
            {notifications.map((n, index) => (
              <div key={n.id}>
                <DropdownMenuItem
                  className={cn(
                    'group relative px-4 py-3 transition-colors',
                    'hover:bg-transparent focus:bg-transparent',
                    !n.read && 'bg-blue-50 hover:bg-blue-50 focus:bg-blue-50',
                  )}
                >
                  <div className="flex gap-3 w-full pr-4">
                    {/* 아이콘 */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-blue-100">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>

                    {/* 내용 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p
                          className={cn(
                            'text-sm font-medium truncate',
                            n.read ? 'text-gray-500/70' : 'text-gray-800',
                          )}
                        >
                          {n.title}
                        </p>
                      </div>
                      <p
                        className={cn(
                          'text-xs line-clamp-2 mb-1',
                          n.read ? 'text-gray-500/70' : 'text-gray-700',
                        )}
                      >
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

                  {/* 액션 버튼 */}
                  {!n.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-blue-100 cursor-pointer"
                      onClick={(e) => handleMarkAsRead(n.id, e)}
                    >
                      <Check className="h-4 w-4 text-blue-700" />
                    </Button>
                  )}
                </DropdownMenuItem>

                {index < notifications.length - 1 && <DropdownMenuSeparator />}
              </div>
            ))}
            {hasNextPage && (
              <div className="p-2 border-t border-gray-200">
                <Button
                  variant="ghost"
                  className="w-full text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={fetchNextPage}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? '불러오는 중...' : '더 보기'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </DropdownMenuContent>
  );
};

export default NotificationDropdownMenu;
