import { SidebarProvider } from '@/shared/components/shadcn/sidebar';
import AppSidebar from '@/widgets/AppSidebar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex w-screen h-screen">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
