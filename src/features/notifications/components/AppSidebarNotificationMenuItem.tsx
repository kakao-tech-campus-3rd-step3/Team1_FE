import { DropdownMenu, DropdownMenuTrigger } from '@/shared/components/shadcn/dropdown-menu';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/shared/components/shadcn/tooltip';
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/components/shadcn/sidebar';
import { Bell } from 'lucide-react';
import { Badge } from '@/shared/components/shadcn/badge';
import { useNotificationsQuery } from '@/features/notifications/hooks/useNotificationsQuery';
import NotificationDropdownMenu from '@/features/notifications/components/NotificationDropdownMenu';

const AppSidebarNotificationMenuItem = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useNotificationsQuery();

  const notifications = data?.pages.flatMap((p) => p.notifications) ?? [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <SidebarMenuItem className="pb-4">
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild onFocus={(e) => e.preventDefault()}>
              <SidebarMenuButton className="relative" disabled={isLoading}>
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute top-1 right-0.5 h-3 w-3 flex items-center justify-center p-0 bg-red-500 text-white text-[10px]">
                    {unreadCount}
                  </Badge>
                )}
              </SidebarMenuButton>
            </TooltipTrigger>
          </DropdownMenuTrigger>

          <TooltipContent side="right" className="text-center">
            <p>알림</p>
          </TooltipContent>
        </Tooltip>

        <NotificationDropdownMenu
          notifications={notifications}
          unreadCount={unreadCount}
          hasNextPage={!!hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export default AppSidebarNotificationMenuItem;
