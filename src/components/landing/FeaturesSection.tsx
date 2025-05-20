
import React, { useState } from "react";
import { Calendar, PackageOpen, Shield, PaintBucket, Sparkles, Users, Maximize, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  iconBackground: string;
  titleColor: string;
  descriptionColor: string;
}

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  image, 
  imageAlt, 
  iconBackground, 
  titleColor, 
  descriptionColor 
}: FeatureProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/10">
        <div className="p-8">
          <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-6 ${iconBackground} mx-auto`}>
            {icon}
          </div>
          <h3 className={`text-2xl font-bold mb-4 text-center ${titleColor}`}>{title}</h3>
          <p className={`text-center ${descriptionColor} text-lg font-semibold mb-6`}>
            {description}
          </p>
        </div>
        <div className="px-4 pb-8">
          <div className="overflow-hidden rounded-lg relative group">
            <img 
              alt={imageAlt} 
              className="w-full h-auto rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-500 cursor-pointer" 
              src={image} 
              onClick={() => setIsOpen(true)}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/50 p-2 rounded-full">
                <Maximize className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setIsOpen(true)}
            >
              <Maximize className="h-4 w-4" />
              View Full Size
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-[90vw] p-1 border-none">
          <DialogClose className="absolute right-2 top-2 z-10 rounded-full bg-background/80 p-1">
            <X className="h-5 w-5" />
          </DialogClose>
          <div className="overflow-auto max-h-[90vh]">
            <img 
              src={image} 
              alt={imageAlt} 
              className="w-full h-auto object-contain" 
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const FeaturesSection = () => {
  const features: FeatureProps[] = [
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: "Job & Task Management",
      description: "Schedule, assign and track all finishing tasks with ease. Keep workflows organized and meet deadlines consistently.",
      image: "/lovable-uploads/79510a99-0516-4ff2-9de5-8c2c4d375d74.png",
      imageAlt: "Job Scheduling",
      iconBackground: "bg-orange-500",
      titleColor: "text-orange-500",
      descriptionColor: "text-orange-400"
    },
    {
      icon: <PackageOpen className="h-8 w-8 text-primary" />,
      title: "Inventory Tracking",
      description: "Monitor stock levels, track material usage, and manage your warehouse with powerful tools.",
      image: "/lovable-uploads/ee00c8a0-3a78-4c4b-8ec8-bdadea248b70.png",
      imageAlt: "Inventory Dashboard",
      iconBackground: "bg-blue-200",
      titleColor: "text-blue-900",
      descriptionColor: "text-blue-800"
    },
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Compliance Management",
      description: "Stay compliant with certifications, PPE requirements, and hazardous waste tracking tools.",
      image: "/lovable-uploads/aa9363f8-55d3-4590-bdfc-72baedabec6e.png",
      imageAlt: "Compliance Tools",
      iconBackground: "bg-orange-500",
      titleColor: "text-orange-500",
      descriptionColor: "text-orange-400"
    },
    {
      icon: <PaintBucket className="h-8 w-8 text-primary" />,
      title: "Custom Creations",
      description: "Create and manage custom paint colors, stains, and finishing recipes all in one place.",
      image: "/lovable-uploads/5e6c3750-c9db-4e38-95c6-5056f2ab7ecb.png",
      imageAlt: "Custom Creations Library",
      iconBackground: "bg-blue-200",
      titleColor: "text-blue-900",
      descriptionColor: "text-blue-800"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-white" />,
      title: "Quality Control",
      description: "Track inspections, manage quality issues, and maintain high standards with built-in quality management tools.",
      image: "/lovable-uploads/74d7618a-542f-48b5-815a-31f6ee6a0599.png",
      imageAlt: "Quality Control Dashboard",
      iconBackground: "bg-orange-500",
      titleColor: "text-orange-500",
      descriptionColor: "text-orange-400"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-950" />,
      title: "Workflows",
      description: "Keep track of your workflows step-by-step for each job and unique process.",
      image: "/lovable-uploads/5d9c1534-dcb3-4c4c-954a-ab158f65466c.png",
      imageAlt: "Team Management Dashboard",
      iconBackground: "bg-blue-200",
      titleColor: "text-blue-900",
      descriptionColor: "text-blue-800"
    }
  ];

  return (
    <section id="features" className="bg-orange-100 py-[70px]">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl tracking-tight text-blue-900 font-extrabold sm:text-5xl">
            Comprehensive Features for Finishing Operations
          </h2>
          <p className="mt-4 text-lg max-w-[800px] mx-auto text-blue-800 font-bold">
            Everything you need to manage your finishing department efficiently in one powerful platform.
          </p>
        </div>
        
        <div className="grid gap-12 md:grid-cols-2 max-w-[1400px] mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              imageAlt={feature.imageAlt}
              iconBackground={feature.iconBackground}
              titleColor={feature.titleColor}
              descriptionColor={feature.descriptionColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
