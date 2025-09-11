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

import { Separator } from '@/shared/components/shadcn/separator';
import logo from '@/shared/assets/images/15.png';
import ProjectsMenu from '@/shared/components/ui/ProjectsMenu';
import { Link } from 'react-router';
import { useEffect } from 'react';

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
  { title: '팀플 A', url: '/project/123' },
  { title: '팀플 B', url: '/project/124' },
  { title: '팀플 C', url: '/project/125' },
];
const items: SidebarItem[] = [
  { title: '나의 할 일', url: '/my-task', icon: <User size={16} /> },
  { title: '프로젝트', url: '/project', icon: <Layers size={16} />, subItems: sub_items },
  { title: '알림', url: '/alarm', icon: <Bell size={16} /> },
  { title: '설정', url: '/settings', icon: <Settings size={16} /> },
];

const AppSidebar = () => {
  //TODO: 로그인된 사용자이면 아바타 이미지,로그아웃 버튼 나옴

  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <Sidebar
      variant="sidebar"
      className=" border-0 border-gray-300"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      collapsible="icon"
    >
      <SidebarHeader className="flex-row text-center pt-4 pb-4 pl-3 pr-3 h-18 bg-white">
        <a className="flex justify-center align-middle w-11 h-11 bg-boost-orange rounded-4xl items-center">
          <img src={logo} alt="" className="w-8 h-8" />
        </a>
      </SidebarHeader>

      <SidebarContent className=" flex-col align-middle pl-3 pr-3 bg-white">
        <Separator />
        <SidebarGroup />
        <SidebarMenu>
          <SidebarGroup>
            {items.map((item) => (
              <SidebarMenuItem key={item.title} className="pb-4">
                {item.title === '프로젝트' ? (
                  <ProjectsMenu item={item} />
                ) : (
                  <SidebarMenuButton key={item.title} asChild>
                    <Link to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarGroup>
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <Separator className=" pl-3 pr-3" />

      <SidebarFooter className="w-full pl-6 pr-3 pt-4 pb-4 bg-white">
        <LogOut color="#D55F5A" />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
