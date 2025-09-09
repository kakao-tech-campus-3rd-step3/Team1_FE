import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import {
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '../shadcn/sidebar';
import { ChevronDown } from 'lucide-react';
import React from 'react';

const CollapsibleSubMenu = ({ item}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} defaultOpen className="group/collapsible">
      <CollapsibleTrigger asChild>
        <SidebarMenuButton asChild>
          <div className="flex items-center w-full">
            {item.icon}
            <span className="ml-2">{item.title}</span>
            <ChevronDown
              className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </SidebarMenuButton>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubButton asChild>
            <a href="/projects/1">
              <span className="flex-1 text-left">프로젝트vmf 1</span>
            </a>
          </SidebarMenuSubButton>
          <SidebarMenuSubButton asChild>
            <a href="/projects/2">
              <span className="flex-1 text-left">프로젝트 2</span>
            </a>
          </SidebarMenuSubButton>
          <SidebarMenuSubButton asChild>
            <a href="/projects/3">
              <span className="flex-1 text-left">프로젝트 3</span>
            </a>
          </SidebarMenuSubButton>
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleSubMenu;
