import { SidebarInset, SidebarProvider } from '@/shared/components/shadcn/sidebar';
import AppSidebar from '@/widgets/AppSidebar';
import React from 'react';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className=" w-screen h-screen ">
        <AppSidebar />
        <main className=" w-screen h-screen">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
