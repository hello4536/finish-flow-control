import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { BarChart3, Package, Calendar, Briefcase, Home, Settings, Palette, Shield, TrendingUp, Building, Wrench } from "lucide-react";
import LogoLink from "./LogoLink";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const mainItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Job Management", url: "/job-management", icon: Briefcase },
    { title: "Asset Management", url: "/asset-management", icon: Package },
    { title: "Operations", url: "/operations", icon: Calendar },
    { title: "Creative Hub", url: "/creative-hub", icon: Palette },
    { title: "Compliance & Safety", url: "/compliance", icon: Shield },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
  ];

  const adminItems = [
    { title: "Administration", url: "/administration", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") return currentPath === path;
    return currentPath.startsWith(path);
  };

  const getNavCls = ({ isActive }: { isActive: boolean; }) => {
    const baseClasses = "flex items-center gap-3 rounded-lg transition-all duration-300 p-3 group relative overflow-hidden";
    
    if (isActive) {
      return `${baseClasses} bg-primary/15 text-primary border-l-4 border-primary shadow-md`;
    }
    
    return `${baseClasses} text-primary hover:bg-primary/8 hover:text-white hover:translate-x-1`;
  };

  return (
    <Sidebar 
      className={`${collapsed ? "w-16" : "w-64"} bg-sidebar border-r border-sidebar-border shadow-xl`} 
      collapsible="icon"
    >
      {/* Brand Header */}
      {!collapsed && (
        <SidebarHeader className="p-4 border-b border-sidebar-border/50">
          <LogoLink />
        </SidebarHeader>
      )}

      {/* Collapsed Brand */}
      {collapsed && (
        <div className="p-3 border-b border-sidebar-border/50 flex justify-center">
          <img 
            src="/lovable-uploads/831be762-1da7-4615-9dac-d59cc2386de3.png" 
            alt="Finivo Logo" 
            className="h-10 w-10 object-contain" 
          />
        </div>
      )}
      
      <SidebarContent className="px-3 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-primary font-semibold uppercase tracking-wider text-xs mb-3 px-3">
              Main Menu
            </SidebarGroupLabel>
          )}
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/dashboard"} 
                      className={getNavCls}
                      title={collapsed ? item.title : undefined}
                    >
                      <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-200 ${isActive(item.url) ? 'scale-110' : 'group-hover:scale-105'}`}>
                        <item.icon className="w-full h-full" />
                      </div>
                      {!collapsed && (
                        <span className="font-medium truncate">
                          {item.title}
                        </span>
                      )}
                      {/* Active indicator */}
                      {isActive(item.url) && (
                        <div className="absolute right-2 w-2 h-2 bg-sidebar-accent rounded-full animate-pulse" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        <SidebarGroup className="mt-8">
          {!collapsed && (
            <SidebarGroupLabel className="text-primary font-semibold uppercase tracking-wider text-xs mb-3 px-3">
              Administration
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {adminItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                      title={collapsed ? item.title : undefined}
                    >
                      <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-200 ${isActive(item.url) ? 'scale-110' : 'group-hover:scale-105'}`}>
                        <item.icon className="w-full h-full" />
                      </div>
                      {!collapsed && (
                        <span className="font-medium truncate">
                          {item.title}
                        </span>
                      )}
                      {/* Active indicator */}
                      {isActive(item.url) && (
                        <div className="absolute right-2 w-2 h-2 bg-sidebar-accent rounded-full animate-pulse" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Toggle Button */}
      <div className="p-3 border-t border-sidebar-border/50">
        <SidebarTrigger className="w-full justify-center text-primary hover:text-white hover:bg-primary/8 transition-all duration-200 rounded-lg p-2" />
      </div>
    </Sidebar>
  );
}
