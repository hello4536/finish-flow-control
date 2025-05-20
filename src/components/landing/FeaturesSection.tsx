
import React, { useState } from "react";
import { Calendar, PackageOpen, Shield, PaintBucket, Sparkles, Users, LayoutDashboard, FileText, CheckCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface FeatureTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  screenshot: string;
  altText: string;
  description: string;
  features: string[];
}

const FeaturesSection = () => {
  const featureTabs: FeatureTab[] = [{
    id: "job-management",
    label: "Job Management",
    icon: <Calendar className="h-5 w-5" />,
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
    icon: <PackageOpen className="h-5 w-5" />,
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
    icon: <Shield className="h-5 w-5" />,
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
    icon: <PaintBucket className="h-5 w-5" />,
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
    icon: <Sparkles className="h-5 w-5" />,
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
    icon: <Users className="h-5 w-5" />,
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
    icon: <LayoutDashboard className="h-5 w-5" />,
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

  const [activeTab, setActiveTab] = useState(featureTabs[0].id);

  return <section id="features" className="py-20 bg-slate-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl tracking-tight font-extrabold text-blue-900 sm:text-5xl">
            Comprehensive Features for Finishing Operations
          </h2>
          <p className="mt-4 text-lg max-w-[800px] mx-auto text-blue-800 font-medium">
            Everything you need to manage your finishing department efficiently in one powerful platform.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <Tabs defaultValue={featureTabs[0].id} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="h-auto p-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1">
                {featureTabs.map(tab => <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1.5 h-10 px-3">
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>)}
              </TabsList>
            </div>

            {/* Tab Content */}
            {featureTabs.map(tab => <TabsContent key={tab.id} value={tab.id} className="focus-visible:outline-none">
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-lg">
                  {/* Screenshot Section */}
                  <div className="aspect-video w-full relative">
                    <img src={tab.screenshot} alt={tab.altText} className="w-full h-full object-contain" />
                  </div>
                  
                  {/* Features Section */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-blue-900 mb-3">{tab.label}</h3>
                    <p className="text-lg text-blue-800 mb-6">{tab.description}</p>
                    
                    <div>
                      <h4 className="text-xl font-semibold text-blue-900 mb-4">Key Features & Benefits</h4>
                      <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                        {tab.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                            <span className="text-blue-800">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-8 flex justify-center">
                        <Button className="px-6">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>)}
          </Tabs>
        </div>
      </div>
    </section>;
};

export default FeaturesSection;
