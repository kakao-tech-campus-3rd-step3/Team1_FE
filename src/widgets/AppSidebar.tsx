import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/components/shadcn/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/shared/components/shadcn/sidebar';
import { User, Layers, Bell, Settings, LogOut } from 'lucide-react';

import { Separator } from '@/shared/components/ui/separator';
import logo from '@/shared/assets/images/15.png';
import ProjectsMenu from '@/shared/components/ui/ProjectsMenu ';


export interface SidebarSubItem {
  title: string;
  url: string;
}

export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ReactNode;
  subItems?: SidebarSubItem[];
}
//TODO: 추후 프로젝트 목록은 api로 받아올 예정
const sub_items = [
  { title: '프로젝트vmf 1', url: '/projects/1' },
  { title: '프로젝트 2', url: '/projects/2' },
  { title: '프로젝트 3', url: '/projects/3' },
];
const items :SidebarItem[]= [
  { title: '나의 할 일', url: 'mytasks', icon: <User size={16} /> },
  { title: '프로젝트', url: '/projects', icon: <Layers size={16} />, subItems: sub_items },
  { title: '알림', url: '/alarm', icon: <Bell size={16} /> },
  { title: '설정', url: '/settings', icon: <Settings size={16} /> },
];

const AppSidebar = () => {
  //TODO: 로그인된 사용자이면 아바타 이미지,로그아웃 버튼 나옴

  const { setOpen } = useSidebar();

  return (
    <Sidebar
    variant="sidebar"
    className='bg-blue-500'
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      collapsible="icon"
      
    >
      <SidebarHeader className="flex flex-row text-center pt-4 pb-4 pl-3 pr-3 h-18 bg-white">
          <a className="flex justify-center w-11 h-11  items-center align-middle bg-amber-300 rounded-4xl">
            <img src={logo} alt="" className="w-9 h-9" />
          </a>
         
      </SidebarHeader>

      <SidebarContent className="pl-3 pr-3 bg-white">
        <Separator />
        <SidebarGroup />
        <SidebarMenu>
          <SidebarGroup>
            {items.map((item) => (
              <SidebarMenuItem key={item.title} className="pb-4">
                {item.title==="프로젝트"? (
                  < ProjectsMenu item={item} />
                ) : (
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarGroup>
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter  className='w-full flex justify-center pt-4 pb-4  pl-3 pr-3 bg-white'  >
               <Separator  />

        <LogOut color="#D55F5A" />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
