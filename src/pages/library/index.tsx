import { Outlet } from 'react-router';

import { AppSidebar } from '@/components/general/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const Library = () => {
  return (
    <SidebarProvider className="max-h-screen">
      <AppSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Library;
