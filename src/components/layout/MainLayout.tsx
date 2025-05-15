import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";
export const MainLayout = () => {
  return <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 overflow-auto p-4 md:p-6 bg-sky-50">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>;
};
export default MainLayout;