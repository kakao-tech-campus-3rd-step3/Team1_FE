import { SidebarProvider } from '@/shared/components/shadcn/sidebar';
import AppSidebar from '@/widgets/AppSidebar';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex w-screen h-screen">
        <AppSidebar />
        <main className="flex-1 h-full">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
