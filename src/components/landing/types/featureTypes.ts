
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
  id: "job-management",
  label: "Job Management",
  icon: "Calendar",
  screenshot: "/lovable-uploads/79510a99-0516-4ff2-9de5-8c2c4d375d74.png",
  altText: "Job Management Dashboard",
  description: "Efficiently track and manage all your finishing projects in one place",
  features: [
    "Schedule jobs and assign tasks to team members",
    "Track progress with real-time status updates",
    "Manage deadlines and prioritize work efficiently",
    "Generate detailed job reports and analytics",
    "Reduce project delays by 40%",
    "Increase team efficiency by 35%",
    "Improve customer satisfaction rates"
  ]
}, {
  id: "inventory",
  label: "Inventory Tracking",
  icon: "PackageOpen",
  screenshot: "/lovable-uploads/ee00c8a0-3a78-4c4b-8ec8-bdadea248b70.png",
  altText: "Inventory Tracking Dashboard",
  description: "Keep track of all your materials, supplies, and stock levels in real-time",
  features: [
    "Monitor stock levels with automated alerts",
    "Track material usage across different jobs",
    "Manage warehouse locations and organization",
    "Generate inventory reports and forecasts",
    "Reduce inventory shortages by 65%",
    "Lower carrying costs by 28%",
    "Streamline ordering processes"
  ]
}, {
  id: "compliance",
  label: "Compliance Management",
  icon: "Shield",
  screenshot: "/lovable-uploads/aa9363f8-55d3-4590-bdfc-72baedabec6e.png",
  altText: "Compliance Management Dashboard",
  description: "Stay compliant with industry regulations and safety standards",
  features: [
    "Track certifications and renewal dates",
    "Manage PPE requirements and inventory",
    "Monitor hazardous waste handling procedures",
    "Generate compliance reports for audits",
    "Reduce compliance violations by 80%",
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
    "Improve formula consistency by 85%",
    "Reduce training time for new staff",
    "Increase production speed by 30%"
  ]
}, {
  id: "quality",
  label: "Quality Control",
  icon: "Sparkles",
  screenshot: "/lovable-uploads/74d7618a-542f-48b5-815a-31f6ee6a0599.png",
  altText: "Quality Control Dashboard",
  description: "Maintain high standards with comprehensive quality management tools",
  features: [
    "Track inspections and quality checks",
    "Document quality issues with photos",
    "Assign and monitor corrective actions",
    "Generate quality performance reports",
    "Reduce defect rates by 45%",
    "Improve first-pass yield by 38%",
    "Enhance customer satisfaction"
  ]
}, {
  id: "workflows",
  label: "Workflows",
  icon: "Users",
  screenshot: "/lovable-uploads/5d9c1534-dcb3-4c4c-954a-ab158f65466c.png",
  altText: "Workflows Dashboard",
  description: "Standardize and optimize your finishing processes with custom workflows",
  features: [
    "Create step-by-step process templates",
    "Track workflow completion and timing",
    "Assign tasks to specific team members",
    "Optimize processes with workflow analytics",
    "Reduce process variation by 60%",
    "Decrease training time by 50%",
    "Improve production consistency"
  ]
}, {
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
    "Improve decision-making speed by 60%",
    "Increase operational transparency",
    "Enhance resource allocation efficiency"
  ]
}];
