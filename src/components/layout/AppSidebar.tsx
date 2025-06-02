
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
  Spray,
  Bot
} from "lucide-react";

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
    { to: "/spray-booth", icon: Spray, label: "Spray Booth" },
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
    <div className="w-64 h-screen bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Navigation</h2>
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AppSidebar;
