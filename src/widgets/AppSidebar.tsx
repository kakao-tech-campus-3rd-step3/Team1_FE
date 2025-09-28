import { SidebarMenu } from '@/shared/components/shadcn/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/shared/components/shadcn/sidebar';
import { Separator } from '@/shared/components/shadcn/separator';
import logo from '@/shared/assets/images/15.png';
import { items } from '@/features/sidebar/data/menuData';
import { LogOut } from 'lucide-react';
import AppSidebarMenuItem from '@/features/sidebar/components/AppSidebarMenuItem';
import AppSidebarProjectMenuItem from '@/features/sidebar/components/AppSidebarProjectMenuItem';

const AppSidebar = () => {
  //TODO: 로그인된 사용자이면 아바타 이미지,로그아웃 버튼 나옴
  console.log(items);

  return (
    <Sidebar variant="sidebar" className="border-0 border-gray-300" collapsible="icon">
      <SidebarHeader className="flex-row text-center pt-4 pb-4 pl-3 pr-3 h-18 bg-white">
        <a className="flex justify-center items-center w-11 h-11 bg-boost-orange rounded-4xl">
          <img src={logo} alt="" className="w-8 h-8" />
        </a>
      </SidebarHeader>

      <SidebarContent className="flex-col pl-3 pr-3 bg-white">
        <Separator />
        <SidebarGroup />
        <SidebarMenu>
          <SidebarGroup>
            {items.map((item) =>
              item.title === '프로젝트' ? (
                <AppSidebarProjectMenuItem key={item.title} item={item} />
              ) : (
                <AppSidebarMenuItem key={item.title} item={item} />
              ),
            )}
          </SidebarGroup>
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>

      <Separator className="pl-3 pr-3" />

      <SidebarFooter className="w-full pl-6 pr-3 pt-4 pb-4 bg-white">
        <LogOut color="#D55F5A" />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
