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
  }) => isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50";
  return <Sidebar className={`${collapsed ? "w-14" : "w-60"} bg-white`} collapsible="icon">
      <SidebarTrigger className="m-2 self-end text-gray-700" />
      <div className="flex items-center justify-center py-4">
        {!collapsed ? <h1 className="text-xl font-bold text-gray-800">Finish<span className="text-accent">Flow</span></h1> : <span className="text-xl font-bold text-accent">F</span>}
      </div>

      <SidebarContent className="bg-zinc-400">
        <SidebarGroup className="bg-indigo-500">
          <SidebarGroupLabel className="text-gray-500">
            Main
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="bg-gray-300 rounded-sm">
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
          <SidebarGroupLabel className="text-gray-500">
            Administration
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="bg-indigo-600">
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