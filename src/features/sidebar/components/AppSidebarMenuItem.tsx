import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shared/components/shadcn/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/shadcn/tooltip';
import type { SidebarItem } from '../types/menuTypes';
import { Link } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/dropdown-menu';

const AppSidebarMenuItem = ({ item }: { item: SidebarItem }) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  console.log(item);

  return (
    <SidebarMenuItem className="pb-4">
      <SidebarMenuButton asChild>
        {hasSubItems ? (
          // subItems가 있으면 클릭 시 메뉴 확장
          <div>
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger>{item.icon}</DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-center">
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>

              <DropdownMenuContent side="right">
                <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* 하위 메뉴 아이템들 */}
                {item.subItems!.map((sub) => (
                  <DropdownMenuItem key={sub.title}>
                    <Link to={sub.url}>{sub.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* 실제 하위 메뉴 */}

            <SidebarMenuSub>
              {item.subItems!.map((sub) => (
                <SidebarMenuSubItem key={sub.title}>
                  <SidebarMenuSubButton asChild>
                    <Link to={sub.url}>{sub.title}</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </div>
        ) : (
          // subItems 없으면 일반 링크
          <Link to={item.url || '#'}>
            <Tooltip>
              <TooltipTrigger>{item.icon}</TooltipTrigger>
              <TooltipContent side="right" className="text-center">
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
          </Link>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
export default AppSidebarMenuItem;
