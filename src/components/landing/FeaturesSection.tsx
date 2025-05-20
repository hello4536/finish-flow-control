
import React from "react";
import { Check, Maximize, X } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 mb-3">
    <div className="rounded-full p-0.5 bg-green-500 text-white shrink-0 mt-0.5">
      <Check className="h-3.5 w-3.5" />
    </div>
    <p className="text-blue-800 text-lg">{children}</p>
  </div>
);

const MetricBadge = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-blue-50 p-3 rounded-lg text-center min-w-[100px]">
    <div className="text-primary text-2xl font-bold">{value}</div>
    <div className="text-blue-500 text-sm">{label}</div>
  </div>
);

const FeatureImageSection = ({ 
  image, 
  imageAlt,
  isOpen,
  setIsOpen
}: { 
  image: string; 
  imageAlt: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <>
      <div className="overflow-hidden rounded-lg shadow-xl border-2 border-primary/10 relative group">
        <img 
          src={image} 
          alt={imageAlt}
          className="w-full h-auto cursor-pointer group-hover:scale-105 transition-transform duration-500"
          onClick={() => setIsOpen(true)}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/50 p-2 rounded-full">
            <Maximize className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-[90vw] p-1 border-none">
          <DialogClose className="absolute right-2 top-2 z-10 rounded-full bg-background/80 p-1">
            <X className="h-5 w-5" />
          </DialogClose>
          <div className="overflow-auto max-h-[90vh]">
            <img src={image} alt={imageAlt} className="w-full h-auto object-contain" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const FeatureSection = ({
  title,
  description,
  imageOnRight = false,
  image,
  imageAlt,
  features,
  metrics
}: {
  title: string;
  description: string;
  imageOnRight?: boolean;
  image: string;
  imageAlt: string;
  features: string[];
  metrics: { value: string; label: string }[];
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="py-16 border-b border-slate-200 last:border-none">
      <div className={`grid gap-12 lg:grid-cols-2 items-center ${imageOnRight ? 'lg:grid-flow-dense' : ''}`}>
        <div className={`space-y-6 ${imageOnRight ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
          <FeatureImageSection 
            image={image}
            imageAlt={imageAlt}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-blue-900 mb-4">{title}</h3>
            <p className="text-xl text-blue-700 mb-8 font-semibold">{description}</p>
          </div>
          
          <div className="space-y-3">
            {features.map((feature, i) => (
              <FeatureItem key={i}>{feature}</FeatureItem>
            ))}
          </div>
          
          {metrics.length > 0 && (
            <div className="mt-8">
              <p className="text-blue-900 font-bold mb-3">Key Benefits:</p>
              <div className="flex flex-wrap gap-4">
                {metrics.map((metric, i) => (
                  <MetricBadge key={i} value={metric.value} label={metric.label} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const featuresData = [
    {
      title: "Job & Task Management",
      description: "Schedule, assign and track all finishing tasks with our comprehensive job management system.",
      image: "/lovable-uploads/79510a99-0516-4ff2-9de5-8c2c4d375d74.png",
      imageAlt: "Job Scheduling",
      features: [
        "Create and schedule jobs with detailed timelines",
        "Assign tasks to team members with clear priorities",
        "Track job progress with real-time status updates",
        "Manage deadlines and dependencies between tasks"
      ],
      metrics: [
        { value: "35%", label: "Time Saved" },
        { value: "50%", label: "Fewer Missed Deadlines" },
        { value: "28%", label: "Productivity Increase" }
      ]
    },
    {
      title: "Workflows",
      description: "Keep track of your workflows step-by-step for each job and unique process.",
      image: "/lovable-uploads/5d9c1534-dcb3-4c4c-954a-ab158f65466c.png",
      imageAlt: "Workflow Management",
      features: [
        "Create custom workflows for different job types",
        "Define step-by-step processes with detailed instructions",
        "Track progress through each workflow stage",
        "Standardize processes across your organization"
      ],
      metrics: [
        { value: "40%", label: "Error Reduction" },
        { value: "60%", label: "Training Time Cut" }
      ]
    },
    {
      title: "Inventory Tracking",
      description: "Monitor stock levels, track material usage, and manage your warehouse efficiently.",
      image: "/lovable-uploads/ee00c8a0-3a78-4c4b-8ec8-bdadea248b70.png",
      imageAlt: "Inventory Dashboard",
      features: [
        "Track inventory levels with automated alerts",
        "Monitor material usage across all jobs",
        "Generate purchase orders when stock is low",
        "Track inventory costs and consumption rates"
      ],
      metrics: [
        { value: "24%", label: "Inventory Cost Reduction" },
        { value: "18%", label: "Waste Reduction" },
        { value: "45%", label: "Faster Stocktaking" }
      ]
    },
    {
      title: "Custom Creations",
      description: "Create and manage custom paint colors, stains, and finishing recipes all in one place.",
      image: "/lovable-uploads/5e6c3750-c9db-4e38-95c6-5056f2ab7ecb.png",
      imageAlt: "Custom Creations Library",
      features: [
        "Store formula recipes with exact measurements",
        "Create and catalog custom color matches",
        "Document application techniques and requirements",
        "Share formulas across your organization"
      ],
      metrics: [
        { value: "100%", label: "Formula Accuracy" },
        { value: "85%", label: "Faster Color Matching" }
      ]
    },
    {
      title: "Compliance Management",
      description: "Stay compliant with certifications, PPE requirements, and hazardous waste tracking tools.",
      image: "/lovable-uploads/aa9363f8-55d3-4590-bdfc-72baedabec6e.png",
      imageAlt: "Compliance Tools",
      features: [
        "Track regulatory compliance across operations",
        "Manage material safety data sheets (MSDS)",
        "Monitor and document hazardous waste disposal",
        "Track employee certifications and training"
      ],
      metrics: [
        { value: "90%", label: "Audit Readiness" },
        { value: "65%", label: "Compliance Risk Reduction" }
      ]
    },
    {
      title: "Quality Control",
      description: "Track inspections, manage quality issues, and maintain high standards with built-in quality management tools.",
      image: "/lovable-uploads/74d7618a-542f-48b5-815a-31f6ee6a0599.png",
      imageAlt: "Quality Control Dashboard",
      features: [
        "Create customized quality inspection checklists",
        "Document quality issues with photo evidence",
        "Track resolution of quality problems",
        "Analyze quality metrics and identify trends"
      ],
      metrics: [
        { value: "32%", label: "Fewer Defects" },
        { value: "45%", label: "Customer Satisfaction Increase" }
      ]
    }
  ];

  return (
    <section id="features" className="py-[70px] bg-slate-50">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl tracking-tight text-blue-900 font-extrabold sm:text-5xl">
            Comprehensive Features for Finishing Operations
          </h2>
          <p className="mt-4 text-lg max-w-[800px] mx-auto text-blue-800 font-bold">
            Everything you need to manage your finishing department efficiently in one powerful platform.
          </p>
        </div>
        
        <div className="max-w-[1400px] mx-auto">
          {featuresData.map((feature, index) => (
            <FeatureSection 
              key={index}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              imageAlt={feature.imageAlt}
              features={feature.features}
              metrics={feature.metrics}
              imageOnRight={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
