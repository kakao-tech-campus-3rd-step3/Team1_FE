import { DropdownMenu, DropdownMenuTrigger } from '@/shared/components/shadcn/dropdown-menu';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/shared/components/shadcn/tooltip';
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/components/shadcn/sidebar';
import { Bell } from 'lucide-react';
import { Badge } from '@/shared/components/shadcn/badge';
import { useNotificationsQuery } from '@/features/notifications/hooks/useNotificationsQuery';
import NotificationDropdownMenu from '@/features/notifications/components/NotificationDropdownMenu';
import { useNotificationCountsQuery } from '@/features/notifications/hooks/useNotificationCountsQuery';

const AppSidebarNotificationMenuItem = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useNotificationsQuery();

  const { data: notificationCountData } = useNotificationCountsQuery();
  const notifications = data?.pages.flatMap((p) => p.notifications) ?? [];
  const unreadCount = notificationCountData?.unreadCount ?? 0;

  return (
    <SidebarMenuItem className="pb-4">
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild onFocus={(e) => e.preventDefault()}>
              <SidebarMenuButton className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge
                    className="
                      absolute top-1 right-0.5 
                      h-3 min-w-[0.75rem] 
                      flex items-center justify-center 
                      p-0 bg-red-500 text-white text-[10px]
                    "
                  >
                    {unreadCount}
                  </Badge>
                )}
              </SidebarMenuButton>
            </TooltipTrigger>
          </DropdownMenuTrigger>

          <TooltipContent side="right" className="text-center">
            알림
          </TooltipContent>
        </Tooltip>

        <NotificationDropdownMenu
          notifications={notifications}
          hasNextPage={!!hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export default AppSidebarNotificationMenuItem;
