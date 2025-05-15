
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
    icon: Home,
    color: "bg-finish-blue-500"
  }, {
    title: "Jobs",
    url: "/jobs",
    icon: ClipboardList,
    color: "bg-finish-green-500"
  }, {
    title: "Workflows",
    url: "/workflows",
    icon: PackageOpen,
    color: "bg-finish-amber-500"
  }, {
    title: "Materials",
    url: "/materials",
    icon: Box,
    color: "bg-finish-red-500"
  }, {
    title: "Inventory",
    url: "/inventory",
    icon: Database,
    color: "bg-finish-blue-400"
  }, {
    title: "QC & Compliance",
    url: "/quality",
    icon: CheckSquare,
    color: "bg-finish-green-600"
  }, {
    title: "Schedule",
    url: "/schedule",
    icon: Calendar,
    color: "bg-finish-amber-600"
  }];
  const adminItems = [{
    title: "Reports",
    url: "/reports",
    icon: BarChart,
    color: "bg-finish-blue-600"
  }, {
    title: "Users",
    url: "/users",
    icon: Users,
    color: "bg-finish-amber-400"
  }, {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    color: "bg-finish-gray-600"
  }];
  const isActive = (path: string) => {
    // Root path should only be active if exact match
    if (path === "/") return currentPath === path;
    // Other paths active if they begin with the path
    return currentPath.startsWith(path);
  };
  const isMainExpanded = mainItems.some(i => isActive(i.url));
  const isAdminExpanded = adminItems.some(i => isActive(i.url));
  
  // New function to generate NavLink classes with item-specific colors
  const getNavCls = (item: { color: string }) => {
    return ({ isActive }: { isActive: boolean }) => {
      // Base classes for all items
      const baseClasses = "flex items-center rounded-md transition-colors";
      
      // Active state with item-specific color
      if (isActive) {
        return `${baseClasses} ${item.color} text-white font-medium`;
      }
      
      // Inactive state with hover effect using a lighter version of the color
      return `${baseClasses} hover:bg-opacity-20 hover:${item.color} text-white`;
    };
  };
  
  return <Sidebar className={`${collapsed ? "w-14" : "w-60"} bg-gradient-to-b from-finish-blue-900 to-finish-blue-800`} collapsible="icon">
      <SidebarTrigger className="m-2 self-end text-white hover:bg-finish-blue-700" />
      <div className="flex items-center justify-center py-4">
        {!collapsed ? (
          <h1 className="text-xl font-bold text-white">
            Finish<span className="text-finish-amber-400">Flow</span>
          </h1>
        ) : (
          <span className="text-xl font-bold text-finish-amber-400">F</span>
        )}
      </div>

      <SidebarContent className="border-t border-finish-blue-700">
        <SidebarGroup>
          <SidebarGroupLabel className="text-finish-amber-100 font-semibold">
            Main
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/"} className={getNavCls(item)}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-finish-amber-100 font-semibold">
            Administration
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item)}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}
