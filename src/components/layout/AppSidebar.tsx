
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Package,
  BarChart3,
  CheckSquare,
  Calendar,
  FileText,
  Palette,
  Car,
  Hammer,
  TestTube,
  Users,
  CreditCard,
  Settings,
  Warehouse,
  Wrench,
  ShieldCheck,
  Award,
  Workflow,
  Droplets,
  Bot
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const navigationItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/jobs", icon: Briefcase, label: "Jobs" },
    { to: "/materials", icon: Package, label: "Materials" },
    { to: "/inventory", icon: Warehouse, label: "Inventory" },
    { to: "/equipment", icon: Wrench, label: "Equipment" },
    { to: "/compliance", icon: ShieldCheck, label: "Compliance" },
    { to: "/quality", icon: Award, label: "Quality" },
    { to: "/automation", icon: Bot, label: "Automation" },
    { to: "/workflows", icon: Workflow, label: "Workflows" },
    { to: "/spray-booth", icon: Droplets, label: "Spray Booth" },
    { to: "/reports", icon: BarChart3, label: "Reports" },
    { to: "/tasks", icon: CheckSquare, label: "Daily Tasks" },
    { to: "/schedule", icon: Calendar, label: "Schedule" },
    { to: "/resources", icon: FileText, label: "Resources" },
    { to: "/custom-creations", icon: Palette, label: "Custom Creations" },
    { to: "/autobody-finishing", icon: Car, label: "Auto Body" },
    { to: "/woodworking-finishing", icon: Hammer, label: "Woodworking" },
    { to: "/testing-plan", icon: TestTube, label: "Testing Plan" },
    { to: "/users", icon: Users, label: "Users" },
    { to: "/subscription", icon: CreditCard, label: "Subscription" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center gap-2 ${
                          isActive
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
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
};

export default AppSidebar;
