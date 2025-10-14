import { useNavigate } from 'react-router';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/shared/components/shadcn/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/shadcn/tooltip';
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/components/shadcn/sidebar';
import type { SidebarItem } from '@/features/sidebar/types/menuTypes';
import ProjectCreateButton from '@/features/sidebar/components/ProjectCreateButton';

const AppSidebarProjectMenuItem = ({ item }: { item: SidebarItem }) => {
  const [position, setPosition] = useState(item.subItems ? item.subItems[0].title : '');
  const navigate = useNavigate();
  if (!item.subItems || item.subItems.length === 0) return null;

  return (
    <SidebarMenuItem className="pb-4">
      <DropdownMenu>
        <Tooltip>
          {/* tooltip dropdown 메뉴 트리거 아이콘 */}
          <TooltipTrigger asChild>
            <SidebarMenuButton asChild>
              <DropdownMenuTrigger>{item.icon}</DropdownMenuTrigger>
            </SidebarMenuButton>
          </TooltipTrigger>
          {/* tooltip */}
          <TooltipContent side="right" className="text-center">
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
        {/* dropdown menu: 하위 메뉴 아이템들 */}
        <DropdownMenuContent
          side="right"
          align="center"
          sideOffset={30}
          className="w-56 pt-2 pb-2 border border-gray-300 bg-white shadow-lg rounded-md"
        >
          <DropdownMenuLabel className="text-xs font-medium">{item.title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {item.subItems!.map((sub) => (
              <DropdownMenuRadioItem
                value={sub.title}
                key={sub.title}
                onClick={() => {
                  navigate(sub.url);
                }}
              >
                {sub.title}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <ProjectCreateButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export default AppSidebarProjectMenuItem;
