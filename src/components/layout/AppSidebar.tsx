
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { BarChart, Box, Calendar, CheckSquare, ClipboardList, Database, Home, PackageOpen, Settings, Users } from "lucide-react";
export function AppSidebar() {
  const {
    state
  } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const mainItems = [{
    title: "Dashboard",
    url: "/",
    icon: Home
  }, {
    title: "Jobs",
    url: "/jobs",
    icon: ClipboardList
  }, {
    title: "Workflows",
    url: "/workflows",
    icon: PackageOpen
  }, {
    title: "Materials",
    url: "/materials",
    icon: Box
  }, {
    title: "Inventory",
    url: "/inventory",
    icon: Database
  }, {
    title: "QC & Compliance",
    url: "/quality",
    icon: CheckSquare
  }, {
    title: "Schedule",
    url: "/schedule",
    icon: Calendar
  }];
  const adminItems = [{
    title: "Reports",
    url: "/reports",
    icon: BarChart
  }, {
    title: "Users",
    url: "/users",
    icon: Users
  }, {
    title: "Settings",
    url: "/settings",
    icon: Settings
  }];
  const isActive = (path: string) => {
    // Root path should only be active if exact match
    if (path === "/") return currentPath === path;
    // Other paths active if they begin with the path
    return currentPath.startsWith(path);
  };
  const isMainExpanded = mainItems.some(i => isActive(i.url));
  const isAdminExpanded = adminItems.some(i => isActive(i.url));
  const getNavCls = ({
    isActive
  }: {
    isActive: boolean;
  }) => isActive ? "bg-blue-600 text-white font-medium" : "hover:bg-blue-500 hover:text-white text-white";
  return <Sidebar className={`${collapsed ? "w-14" : "w-60"} bg-blue-700`} collapsible="icon">
      <SidebarTrigger className="m-2 self-end text-white" />
      <div className="flex items-center justify-center py-4">
        {!collapsed ? <h1 className="text-xl font-bold text-white">Finish<span className="text-accent">Flow</span></h1> : <span className="text-xl font-bold text-accent">F</span>}
      </div>

      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">
            Main
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/"} className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-white">
            Administration
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}
