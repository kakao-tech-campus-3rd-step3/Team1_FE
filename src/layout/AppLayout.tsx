import { SidebarInset, SidebarProvider } from '@/shared/components/shadcn/sidebar';
import AppSidebar from '@/widgets/AppSidebar';
import React from 'react';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
     >
      <div className="  bg-amber-700">
    <AppSidebar /> 
   <main className="flex">{children}</main>

  </div>
    </SidebarProvider>
  );
};

export default AppLayout;
