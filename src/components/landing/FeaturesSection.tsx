import React from "react";
import { Calendar, PackageOpen, Shield, PaintBucket, Sparkles, Users } from "lucide-react";
const FeaturesSection = () => {
  return <section id="features" className="bg-orange-100 py-[50px]">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl tracking-tight text-blue-900 font-extrabold sm:text-5xl">
            Comprehensive Features for Finishing Operations
          </h2>
          <p className="mt-4 text-lg max-w-[700px] mx-auto text-blue-800 font-bold">
            Everything you need to manage your finishing department efficiently in one powerful platform.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-card rounded-xl border border-primary/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent py-[5px]">
            <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-orange-500">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center text-orange-500">Job & Task Management</h3>
            <p className="text-center text-orange-400 text-base font-semibold">
              Schedule, assign and track all finishing tasks with ease. Keep workflows organized and meet deadlines consistently.
            </p>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <img alt="Job Scheduling" className="w-full rounded-lg shadow-sm" src="/lovable-uploads/79510a99-0516-4ff2-9de5-8c2c4d375d74.png" />
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-card rounded-xl border border-primary/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent py-[5px]">
            <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-blue-200">
              <PackageOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center text-blue-900">Inventory Tracking</h3>
            <p className="text-center text-blue-800 font-semibold">Monitor stock levels, track material usage, and manage your warehouse with powerful tools.</p>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <img alt="Inventory Dashboard" className="w-full rounded-lg shadow-sm" src="/lovable-uploads/ee00c8a0-3a78-4c4b-8ec8-bdadea248b70.png" />
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-card rounded-xl border border-primary/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent py-[5px]">
            <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-orange-500">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center text-orange-500">Compliance Management</h3>
            <p className="text-center text-orange-400 font-semibold">
              Stay compliant with certifications, PPE requirements, and hazardous waste tracking tools.
            </p>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <img alt="Compliance Tools" className="w-full rounded-lg shadow-sm" src="/lovable-uploads/aa9363f8-55d3-4590-bdfc-72baedabec6e.png" />
            </div>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-card rounded-xl border border-primary/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent py-[5px]">
            <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-blue-200">
              <PaintBucket className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center text-blue-900">Custom Creations</h3>
            <p className="text-center text-blue-800 text-base font-semibold">
              Create and manage custom paint colors, stains, and finishing recipes all in one place.
            </p>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <img alt="Custom Creations Library" className="w-full rounded-lg shadow-sm" src="/lovable-uploads/5e6c3750-c9db-4e38-95c6-5056f2ab7ecb.png" />
            </div>
          </div>
          
          {/* Feature 5 */}
          <div className="bg-card rounded-xl border border-primary/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent py-[5px]">
            <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-orange-500">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center text-orange-500">Quality Control</h3>
            <p className="text-center text-orange-400 font-semibold">
              Track inspections, manage quality issues, and maintain high standards with built-in quality management tools.
            </p>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <img alt="Quality Control Dashboard" className="w-full rounded-lg shadow-sm" src="/lovable-uploads/74d7618a-542f-48b5-815a-31f6ee6a0599.png" />
            </div>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-card rounded-xl border border-primary/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent py-[5px]">
            <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-blue-200">
              <Users className="h-6 w-6 text-blue-950" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center text-blue-900">Workflows</h3>
            <p className="text-center text-blue-800 font-semibold">Keep track of your workflows step-by-step for each job and unique process.</p>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <img alt="Team Management Dashboard" className="w-full rounded-lg shadow-sm" src="/lovable-uploads/5d9c1534-dcb3-4c4c-954a-ab158f65466c.png" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default FeaturesSection;