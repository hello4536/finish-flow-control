
import React from "react";
import { Calendar, PackageOpen, Shield, PaintBucket, Sparkles, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  return <section id="features" className="bg-orange-100 py-[70px]">
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
          {/* Feature 1 */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/10">
            <div className="p-8">
              <div className="h-16 w-16 rounded-full flex items-center justify-center mb-6 bg-orange-500 mx-auto">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-orange-500">Job & Task Management</h3>
              <p className="text-center text-orange-400 text-lg font-semibold mb-6">
                Schedule, assign and track all finishing tasks with ease. Keep workflows organized and meet deadlines consistently.
              </p>
            </div>
            <div className="px-4 pb-8">
              <div className="overflow-hidden rounded-lg">
                <img 
                  alt="Job Scheduling" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-500" 
                  src="/lovable-uploads/79510a99-0516-4ff2-9de5-8c2c4d375d74.png" 
                />
              </div>
            </div>
          </Card>
          
          {/* Feature 2 */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/10">
            <div className="p-8">
              <div className="h-16 w-16 rounded-full flex items-center justify-center mb-6 bg-blue-200 mx-auto">
                <PackageOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-blue-900">Inventory Tracking</h3>
              <p className="text-center text-blue-800 font-semibold text-lg mb-6">
                Monitor stock levels, track material usage, and manage your warehouse with powerful tools.
              </p>
            </div>
            <div className="px-4 pb-8">
              <div className="overflow-hidden rounded-lg">
                <img 
                  alt="Inventory Dashboard" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-500" 
                  src="/lovable-uploads/ee00c8a0-3a78-4c4b-8ec8-bdadea248b70.png" 
                />
              </div>
            </div>
          </Card>
          
          {/* Feature 3 */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/10">
            <div className="p-8">
              <div className="h-16 w-16 rounded-full flex items-center justify-center mb-6 bg-orange-500 mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-orange-500">Compliance Management</h3>
              <p className="text-center text-orange-400 font-semibold text-lg mb-6">
                Stay compliant with certifications, PPE requirements, and hazardous waste tracking tools.
              </p>
            </div>
            <div className="px-4 pb-8">
              <div className="overflow-hidden rounded-lg">
                <img 
                  alt="Compliance Tools" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-500" 
                  src="/lovable-uploads/aa9363f8-55d3-4590-bdfc-72baedabec6e.png" 
                />
              </div>
            </div>
          </Card>
          
          {/* Feature 4 */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/10">
            <div className="p-8">
              <div className="h-16 w-16 rounded-full flex items-center justify-center mb-6 bg-blue-200 mx-auto">
                <PaintBucket className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-blue-900">Custom Creations</h3>
              <p className="text-center text-blue-800 text-lg font-semibold mb-6">
                Create and manage custom paint colors, stains, and finishing recipes all in one place.
              </p>
            </div>
            <div className="px-4 pb-8">
              <div className="overflow-hidden rounded-lg">
                <img 
                  alt="Custom Creations Library" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-500" 
                  src="/lovable-uploads/5e6c3750-c9db-4e38-95c6-5056f2ab7ecb.png" 
                />
              </div>
            </div>
          </Card>
          
          {/* Feature 5 */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/10">
            <div className="p-8">
              <div className="h-16 w-16 rounded-full flex items-center justify-center mb-6 bg-orange-500 mx-auto">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-orange-500">Quality Control</h3>
              <p className="text-center text-orange-400 font-semibold text-lg mb-6">
                Track inspections, manage quality issues, and maintain high standards with built-in quality management tools.
              </p>
            </div>
            <div className="px-4 pb-8">
              <div className="overflow-hidden rounded-lg">
                <img 
                  alt="Quality Control Dashboard" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-500" 
                  src="/lovable-uploads/74d7618a-542f-48b5-815a-31f6ee6a0599.png" 
                />
              </div>
            </div>
          </Card>
          
          {/* Feature 6 */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/10">
            <div className="p-8">
              <div className="h-16 w-16 rounded-full flex items-center justify-center mb-6 bg-blue-200 mx-auto">
                <Users className="h-8 w-8 text-blue-950" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-blue-900">Workflows</h3>
              <p className="text-center text-blue-800 font-semibold text-lg mb-6">Keep track of your workflows step-by-step for each job and unique process.</p>
            </div>
            <div className="px-4 pb-8">
              <div className="overflow-hidden rounded-lg">
                <img 
                  alt="Team Management Dashboard" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-500" 
                  src="/lovable-uploads/5d9c1534-dcb3-4c4c-954a-ab158f65466c.png" 
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>;
};

export default FeaturesSection;
