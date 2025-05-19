import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { BarChart, Box, Calendar, CheckSquare, ClipboardList, Database, Home, PackageOpen, Settings, Users, Link, Palette, ShieldCheck } from "lucide-react";
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
    color: "bg-accent/90"
  }, {
    title: "Jobs",
    url: "/jobs",
    icon: ClipboardList,
    color: "bg-accent/90"
  }, {
    title: "Workflows",
    url: "/workflows",
    icon: PackageOpen,
    color: "bg-accent/90"
  }, {
    title: "Materials",
    url: "/materials",
    icon: Box,
    color: "bg-accent/90"
  }, {
    title: "Inventory",
    url: "/inventory",
    icon: Database,
    color: "bg-accent/90"
  }, {
    title: "Quality Control",
    url: "/quality",
    icon: CheckSquare,
    color: "bg-accent/90"
  }, {
    title: "Compliance",
    url: "/compliance",
    icon: ShieldCheck,
    color: "bg-accent/90"
  }, {
    title: "Schedule",
    url: "/schedule",
    icon: Calendar,
    color: "bg-accent/90"
  }, {
    title: "Custom Creations",
    url: "/custom-creations",
    icon: Palette,
    color: "bg-accent/90"
  }, {
    title: "Resources",
    url: "/resources",
    icon: Link,
    color: "bg-accent/90"
  }];
  const adminItems = [{
    title: "Reports",
    url: "/reports",
    icon: BarChart,
    color: "bg-accent/90"
  }, {
    title: "Users",
    url: "/users",
    icon: Users,
    color: "bg-accent/90"
  }, {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    color: "bg-accent/90"
  }];
  const isActive = (path: string) => {
    // Root path should only be active if exact match
    if (path === "/") return currentPath === path;
    // Other paths active if they begin with the path
    return currentPath.startsWith(path);
  };
  const isMainExpanded = mainItems.some(i => isActive(i.url));
  const isAdminExpanded = adminItems.some(i => isActive(i.url));

  // Updated function to generate NavLink classes with white fill, navy text, and orange border
  const getNavCls = (item: {
    color: string;
  }) => {
    return ({
      isActive
    }: {
      isActive: boolean;
    }) => {
      // Base classes with white fill, navy text and orange border
      const baseClasses = "flex items-center rounded-md transition-colors p-2 bg-white text-primary border border-accent";

      // Active state with light blue background and navy text
      if (isActive) {
        return `${baseClasses} bg-accent/10 text-primary font-medium shadow-md`;
      }

      // Inactive state with hover effect
      return `${baseClasses} hover:bg-accent/5`;
    };
  };
  return <Sidebar className={`${collapsed ? "w-14" : "w-60"} bg-gradient-to-b from-primary to-primary/90 shadow-xl`} collapsible="icon">
      <SidebarTrigger className="m-2 self-end text-white hover:bg-primary/70" />
      <div className="flex items-center justify-center border-b border-white/10 py-[10px] my-[20px] bg-blue-800">
        {!collapsed ? <h1 className="text-xl font-bold text-white">
            Finish<span className="text-accent">Flow</span>
          </h1> : <span className="text-xl font-bold text-accent">F</span>}
      </div>

      <SidebarContent className="bg-sky-50">
        <SidebarGroup>
          <SidebarGroupLabel className="text-accent font-semibold uppercase tracking-wider text-xs">
            Main
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/"} className={getNavCls(item)}>
                      <item.icon className="mr-2 h-5 w-5" />
                      {!collapsed && <span className="text-sm font-semibold">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-accent font-semibold uppercase tracking-wider text-xs">
            Administration
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item)}>
                      <item.icon className="mr-2 h-5 w-5" />
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