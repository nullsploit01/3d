import { Outlet } from 'react-router';

import { AppSidebar } from '@/components/general/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const Library = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Library;
