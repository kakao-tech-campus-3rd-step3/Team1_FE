import { SidebarMenuButton, SidebarMenuItem } from '@/shared/components/shadcn/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/shadcn/tooltip';
import type { SidebarItem } from '@/features/sidebar/types/menuTypes';
import { Link } from 'react-router';

const AppSidebarMenuItem = ({ item }: { item: SidebarItem }) => {
  console.log(item);

  return (
    <SidebarMenuItem className="pb-4">
      <Link to={item.url || '#'}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton>{item.icon} </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-center">
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      </Link>
    </SidebarMenuItem>
  );
};
export default AppSidebarMenuItem;
