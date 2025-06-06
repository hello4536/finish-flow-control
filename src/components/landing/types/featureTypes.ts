
import { ReactNode } from "react";

export interface FeatureTab {
  id: string;
  label: string;
  icon: ReactNode;
  screenshot: string;
  altText: string;
  description: string;
  features: string[];
}

export const featureTabs: FeatureTab[] = [{
  id: "dashboard",
  label: "Dashboard",
  icon: "LayoutDashboard",
  screenshot: "/lovable-uploads/74d7618a-542f-48b5-815a-31f6ee6a0599.png",
  altText: "Main Dashboard",
  description: "Get a comprehensive overview of your finishing operations at a glance",
  features: [
    "View key performance metrics in real-time",
    "Track job progress across departments",
    "Monitor material usage and inventory levels",
    "Identify bottlenecks and optimization opportunities",
    "Increase operational transparency",
    "Enhance resource allocation efficiency"
  ]
}, {
  id: "compliance",
  label: "Compliance",
  icon: "Shield",
  screenshot: "/lovable-uploads/aa9363f8-55d3-4590-bdfc-72baedabec6e.png",
  altText: "Compliance Management Dashboard",
  description: "Stay compliant with industry regulations and safety standards",
  features: [
    "Track certifications and renewal dates",
    "Manage PPE requirements and inventory",
    "Monitor hazardous waste handling procedures",
    "Generate compliance reports for audits",
    "Streamline audit preparations",
    "Mitigate regulatory risks"
  ]
}, {
  id: "custom-creations",
  label: "Custom Creations",
  icon: "PaintBucket",
  screenshot: "/lovable-uploads/5e6c3750-c9db-4e38-95c6-5056f2ab7ecb.png",
  altText: "Custom Creations Dashboard",
  description: "Create and store custom formulas for paints, stains, and finishes",
  features: [
    "Save and organize custom color formulas",
    "Share recipes across team members",
    "Track ingredient usage and inventory",
    "Document application methods and techniques",
    "Reduce training time for new staff"
  ]
}, {
  id: "daily-tasks",
  label: "Daily Tasks",
  icon: "CheckSquare",
  screenshot: "/lovable-uploads/79510a99-0516-4ff2-9de5-8c2c4d375d74.png",
  altText: "Daily Tasks Management",
  description: "Organize and track daily tasks and assignments for your team",
  features: [
    "Assign tasks to specific team members",
    "Set priorities and due dates",
    "Track task completion in real-time",
    "Generate productivity reports"
  ]
}, {
  id: "equipment",
  label: "Equipment",
  icon: "Wrench",
  screenshot: "/lovable-uploads/74d7618a-542f-48b5-815a-31f6ee6a0599.png",
  altText: "Equipment Management Dashboard",
  description: "Manage all your finishing equipment and maintenance schedules",
  features: [
    "Track equipment status and availability",
    "Schedule preventive maintenance",
    "Monitor equipment performance metrics",
    "Manage equipment assignments",
    "Extend equipment lifespan by 30%"
  ]
}, {
  id: "inventory",
  label: "Inventory",
  icon: "Package",
  screenshot: "/lovable-uploads/ee00c8a0-3a78-4c4b-8ec8-bdadea248b70.png",
  altText: "Inventory Tracking Dashboard",
  description: "Keep track of all your materials, supplies, and stock levels in real-time",
  features: [
    "Monitor stock levels with automated alerts",
    "Track material usage across different jobs",
    "Manage warehouse locations and organization",
    "Generate inventory reports and forecasts",
    "Reduce inventory shortages",
    "Streamline ordering processes"
  ]
}, {
  id: "jobs",
  label: "Jobs",
  icon: "Briefcase",
  screenshot: "/lovable-uploads/79510a99-0516-4ff2-9de5-8c2c4d375d74.png",
  altText: "Job Management Dashboard",
  description: "Efficiently track and manage all your finishing projects in one place",
  features: [
    "Schedule jobs and assign tasks to team members",
    "Track progress with real-time status updates",
    "Manage deadlines and prioritize work efficiently",
    "Generate detailed job reports and analytics",
    "Reduce project delays",
    "Improve customer satisfaction rates"
  ]
}, {
  id: "materials",
  label: "Materials",
  icon: "Layers",
  screenshot: "/lovable-uploads/ee00c8a0-3a78-4c4b-8ec8-bdadea248b70.png",
  altText: "Materials Management Dashboard",
  description: "Manage all your finishing materials, suppliers, and safety data",
  features: [
    "Catalog all materials with detailed specifications",
    "Track material safety data sheets (SDS)",
    "Manage supplier relationships and contacts",
    "Monitor material costs and usage",
    "Ensure regulatory compliance for materials",
    "Streamline supplier communications"
  ]
}, {
  id: "quality-control",
  label: "Quality Control",
  icon: "Award",
  screenshot: "/lovable-uploads/74d7618a-542f-48b5-815a-31f6ee6a0599.png",
  altText: "Quality Control Dashboard",
  description: "Maintain high standards with comprehensive quality management tools",
  features: [
    "Track inspections and quality checks",
    "Document quality issues with photos",
    "Assign and monitor corrective actions",
    "Generate quality performance reports",
    "Enhance customer satisfaction"
  ]
}, {
  id: "resources",
  label: "Resources",
  icon: "FolderOpen",
  screenshot: "/lovable-uploads/5d9c1534-dcb3-4c4c-954a-ab158f65466c.png",
  altText: "Resources Management Dashboard",
  description: "Centralize all your documents, links, receipts, and vendor information",
  features: [
    "Store and organize important documents",
    "Manage vendor contacts and information",
    "Track receipts and reimbursements",
    "Bookmark useful links and resources",
    "Reduce time spent searching for information",
    "Improve document organization",
    "Streamline expense management"
  ]
}, {
  id: "schedule",
  label: "Schedule",
  icon: "Calendar",
  screenshot: "/lovable-uploads/79510a99-0516-4ff2-9de5-8c2c4d375d74.png",
  altText: "Schedule Management Dashboard",
  description: "Plan and coordinate all your finishing operations and appointments",
  features: [
    "Schedule jobs and maintenance activities",
    "Coordinate team assignments and availability",
    "Set reminders for important deadlines",
    "View calendar overview of all activities",
    "Improve resource utilization",
    "Enhance project coordination"
  ]
}, {
  id: "spray-booths",
  label: "Spray Booths",
  icon: "Spray",
  screenshot: "/lovable-uploads/5d9c1534-dcb3-4c4c-954a-ab158f65466c.png",
  altText: "Spray Booth Scheduler Dashboard",
  description: "Optimize spray booth usage and scheduling for maximum efficiency",
  features: [
    "Schedule spray booth reservations",
    "Monitor booth availability in real-time",
    "Track booth utilization metrics",
    "Manage booth maintenance schedules",
    "Reduce wait times and conflicts"
  ]
}, {
  id: "workflows",
  label: "Workflows",
  icon: "GitBranch",
  screenshot: "/lovable-uploads/5d9c1534-dcb3-4c4c-954a-ab158f65466c.png",
  altText: "Workflows Dashboard",
  description: "Standardize and optimize your finishing processes with custom workflows",
  features: [
    "Create step-by-step process templates",
    "Track workflow completion and timing",
    "Assign tasks to specific team members",
    "Optimize processes with workflow analytics",
    "Reduce process variation",
    "Decrease training time",
    "Improve production consistency"
  ]
}, {
  id: "reports",
  label: "Reports",
  icon: "BarChart3",
  screenshot: "/lovable-uploads/74d7618a-542f-48b5-815a-31f6ee6a0599.png",
  altText: "Reports Dashboard",
  description: "Generate comprehensive reports and analytics for data-driven decisions",
  features: [
    "Create detailed performance reports",
    "Track key performance indicators (KPIs)",
    "Generate compliance and audit reports",
    "Export data in multiple formats",
    "Improve decision-making with data insights",
    "Automate report generation",
    "Track trends and performance over time"
  ]
}];
