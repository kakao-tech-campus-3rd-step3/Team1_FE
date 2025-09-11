import { SidebarProvider } from '@/shared/components/shadcn/sidebar';
import AppSidebar from '@/widgets/AppSidebar';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className=" w-screen h-screen ">
        <AppSidebar />
        <main className=" w-screen h-screen">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
