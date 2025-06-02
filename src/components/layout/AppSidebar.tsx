import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { BarChart, Box, Calendar, CheckSquare, ClipboardList, Database, Home, PackageOpen, Settings, Users, Link, Palette, ShieldCheck, CheckCircle, Archive, Paintbrush } from "lucide-react";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const mainItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home, color: "bg-accent/90" },
    { title: "Compliance", url: "/compliance", icon: ShieldCheck, color: "bg-accent/90" },
    { title: "Custom Creations", url: "/custom-creations", icon: Palette, color: "bg-accent/90" },
    { title: "Daily Tasks", url: "/daily-tasks", icon: CheckCircle, color: "bg-accent/90" },
    { title: "Equipment", url: "/equipment", icon: Archive, color: "bg-accent/90" },
    { title: "Inventory", url: "/inventory", icon: Database, color: "bg-accent/90" },
    { title: "Jobs", url: "/jobs", icon: ClipboardList, color: "bg-accent/90" },
    { title: "Materials", url: "/materials", icon: Box, color: "bg-accent/90" },
    { title: "Quality Control", url: "/quality", icon: CheckSquare, color: "bg-accent/90" },
    { title: "Resources", url: "/resources", icon: Link, color: "bg-accent/90" },
    { title: "Schedule", url: "/schedule", icon: Calendar, color: "bg-accent/90" },
    { title: "Spray Booth Scheduler", url: "/spray-booth-scheduler", icon: Paintbrush, color: "bg-accent/90" },
    { title: "Workflows", url: "/workflows", icon: PackageOpen, color: "bg-accent/90" }
  ];

  const adminItems = [
    { title: "Reports", url: "/reports", icon: BarChart, color: "bg-accent/90" },
    { title: "Settings", url: "/settings", icon: Settings, color: "bg-accent/90" },
    { title: "Users", url: "/users", icon: Users, color: "bg-accent/90" }
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") return currentPath === path;
    return currentPath.startsWith(path);
  };

  const isMainExpanded = mainItems.some(i => isActive(i.url));
  const isAdminExpanded = adminItems.some(i => isActive(i.url));

  // Enhanced function to generate NavLink classes with white background, gradient text, and gradient borders
  const getNavCls = (item: { color: string; }) => {
    return ({ isActive }: { isActive: boolean; }) => {
      // Base classes with white background and gradient border
      const baseClasses = "flex items-center rounded-lg transition-all duration-300 p-3 bg-white backdrop-blur-sm shadow-md relative";
      
      // Gradient border using pseudo-element
      const gradientBorder = "before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:bg-gradient-to-r before:from-purple-600 before:to-blue-600 before:-z-10";
      const innerBg = "after:absolute after:inset-[2px] after:rounded-md after:bg-white after:-z-10";

      // Active state with enhanced gradient styling
      if (isActive) {
        return `${baseClasses} ${gradientBorder} ${innerBg} shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold`;
      }

      // Inactive state with subtle border and hover effects
      return `${baseClasses} border-2 border-slate-200 hover:${gradientBorder} hover:${innerBg} hover:border-transparent hover:transform hover:-translate-y-0.5`;
    };
  };

  return (
    <Sidebar 
      className={`${collapsed ? "w-14" : "w-60"} bg-gradient-to-b from-slate-50 via-blue-50/50 to-indigo-100/30 shadow-2xl border-r border-slate-200/50`} 
      collapsible="icon"
    >
      <SidebarTrigger className="m-3 self-end text-slate-600 hover:bg-white/80 hover:text-purple-600 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md" />
      
      <SidebarContent className="bg-transparent px-2">
        <SidebarGroup className="my-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/dashboard"} 
                      className={getNavCls(item)}
                    >
                      <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive(item.url) ? 'text-purple-600' : 'text-slate-600'}`} />
                      {!collapsed && (
                        <span className={`text-sm font-medium truncate ${isActive(item.url) ? 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent' : 'text-slate-700'}`}>
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-slate-500 font-bold uppercase tracking-wider text-xs px-3 mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Administration
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {adminItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls(item)}
                    >
                      <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive(item.url) ? 'text-purple-600' : 'text-slate-600'}`} />
                      {!collapsed && (
                        <span className={`text-sm font-medium truncate ${isActive(item.url) ? 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent' : 'text-slate-700'}`}>
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
