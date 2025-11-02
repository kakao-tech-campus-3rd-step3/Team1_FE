import { SidebarMenu } from '@/shared/components/shadcn/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/shared/components/shadcn/sidebar';
import { Separator } from '@/shared/components/shadcn/separator';
import { items } from '@/features/sidebar/data/menuData';
import { LogOut, User } from 'lucide-react';
import AppSidebarMenuItem from '@/features/sidebar/components/AppSidebarMenuItem';
import AppSidebarProjectMenuItem from '@/features/sidebar/components/AppSidebarProjectMenuItem';
import AppSidebarAlarmMenuItem from '@/features/alarm/components/AppSidebarAlarmMenuItem';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/Router';
import { useLogoutMutation } from '@/features/auth/hooks/useLogoutMutation';
import { useAuthStore } from '@/features/auth/store/authStore';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import { Avatar } from '@/shared/components/shadcn/avatar';

const AppSidebar = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { mutate: LogoutMutaion } = useLogoutMutation();
  const handleHeaderClick = () => {
    navigate(ROUTE_PATH.MY_INFO);
  };

  const handleLogoutClick = () => {
    LogoutMutaion();
  };

  return (
    <Sidebar variant="sidebar" className="border-0 border-gray-300" collapsible="icon">
      <SidebarHeader
        onClick={handleHeaderClick}
        className="flex-row text-center pt-4 pb-4 pl-3 pr-3 h-18 bg-white cursor-pointer"
      >
        <Avatar
          style={{ backgroundColor: user?.backgroundColor }}
          className="flex justify-center items-center w-11 h-11"
        >
          {user ? (
            <img
              src={getAvatarSrc({ avatar: user?.avatar })}
              alt="user avatar"
              className="w-8 h-8 object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-white" strokeWidth={2} />
          )}
        </Avatar>
      </SidebarHeader>

      <SidebarContent className=" pl-3 pr-3 bg-white">
        <Separator />
        <SidebarGroup />
        <SidebarMenu className="flex flex-col items-center">
          {items.map((item) =>
            item.title === '프로젝트' ? (
              <AppSidebarProjectMenuItem key={item.title} item={item} />
            ) : item.title === '알림' ? (
              <AppSidebarAlarmMenuItem key={item.title} />
            ) : (
              <AppSidebarMenuItem key={item.title} item={item} />
            ),
          )}
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>

      <Separator className="pl-3 pr-3" />
      {user && (
        <SidebarFooter className="w-full pl-6 pr-3 pt-4 pb-4 bg-white">
          <LogOut onClick={handleLogoutClick} color="#D55F5A" />
        </SidebarFooter>
      )}
    </Sidebar>
  );
};

export default AppSidebar;
