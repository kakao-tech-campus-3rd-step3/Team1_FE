import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/dropdown-menu';
import { Bell, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/shared/components/shadcn/tooltip';
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/components/shadcn/sidebar';
import { Badge } from '@/shared/components/shadcn/badge';
import { Button } from '@/shared/components/shadcn/button';
import { cn } from '@/shared/lib/utils';
import { mockAlarms } from '@/shared/data/mockAlarms';

const AppSidebarAlarmMenuItem = () => {
  const [alarms, setAlarms] = useState([...mockAlarms]);

  const unreadCount = alarms.filter((i) => !i.read).length;

  const markAsRead = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAlarms(alarms.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const deleteAlarm = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAlarms(alarms.filter((a) => a.id !== id));
  };

  const markAllAsRead = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAlarms((prevAlarms) => prevAlarms.map((a) => ({ ...a, read: true })));
  };

  return (
    <SidebarMenuItem className="pb-4">
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild onFocus={(e) => e.preventDefault()}>
              <SidebarMenuButton className="relative">
                <Bell className="h-3 w-3" />
                {unreadCount > 0 && (
                  <Badge className="absolute z-100 top-1 right-0.5 h-3 w-3 flex items-center justify-center p-0 bg-red-500 text-white text-[10px]">
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

        <DropdownMenuContent
          side="right"
          align="start"
          sideOffset={16}
          className="w-96 max-h-[450px] overflow-y-auto border border-gray-300 bg-white shadow-lg rounded-md"
        >
          <DropdownMenuLabel className="flex items-center justify-between py-3 px-4">
            <span className="text-base font-semibold">알림</span>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <>
                  <span className="text-xs text-gray-500">안읽음 {unreadCount}</span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={markAllAsRead}>
                    모두 읽음
                  </Button>
                </>
              )}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {alarms.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Bell className="h-12 w-12 mb-3 opacity-20" />
              <p className="text-sm">새로운 알림이 없습니다</p>
            </div>
          ) : (
            <div className="py-1">
              {alarms.map((alarm, index) => {
                const Icon = alarm.icon;
                return (
                  <div key={alarm.id}>
                    <DropdownMenuItem
                      className={cn(
                        'group relative px-4 py-3 cursor-pointer',
                        'focus:bg-accent',
                        !alarm.read && 'bg-blue-50',
                      )}
                    >
                      <div className="flex gap-3 w-full pr-16">
                        {/* 아이콘 영역 */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* 내용 영역 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p
                              className={cn(
                                'text-sm',
                                'font-medium',
                                'truncate',
                                alarm.read ? 'text-gray-500/70' : 'text-gray-800',
                              )}
                            >
                              {alarm.title}
                            </p>
                            {!alarm.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p
                            className={cn(
                              'text-xs line-clamp-2 mb-1',
                              alarm.read ? 'text-gray-500/70' : 'text-gray-700',
                            )}
                          >
                            {alarm.description}
                          </p>
                          <p className="text-xs text-gray-500/60">{alarm.time}</p>
                        </div>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        {!alarm.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-blue-100"
                            onClick={(e) => markAsRead(alarm.id, e)}
                          >
                            <Check className="h-4 w-4 text-blue-700" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-red-100"
                          onClick={(e) => deleteAlarm(alarm.id, e)}
                        >
                          <X className="h-4 w-4 text-red-700" />
                        </Button>
                      </div>
                    </DropdownMenuItem>
                    {index < alarms.length - 1 && <DropdownMenuSeparator />}
                  </div>
                );
              })}
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export default AppSidebarAlarmMenuItem;
