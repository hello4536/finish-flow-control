import React from "react";
import { Calendar, PackageOpen, Shield, PaintBucket, Sparkles, Users } from "lucide-react";
const FeaturesSection = () => {
  return <section id="features" className="py-20 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
            Comprehensive Features for Finishing Operations
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
            Everything you need to manage your finishing department efficiently in one powerful platform.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-card rounded-xl border border-primary/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent">
            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary">Job & Task Management</h3>
            <p className="text-muted-foreground">
              Schedule, assign and track all finishing tasks with ease. Keep workflows organized and meet deadlines consistently.
            </p>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <img alt="Job Scheduling" className="w-full rounded-lg shadow-sm" src="/lovable-uploads/79510a99-0516-4ff2-9de5-8c2c4d375d74.png" />
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-card rounded-xl border border-primary/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <PackageOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary">Inventory Tracking</h3>
            <p className="text-muted-foreground">
              Monitor stock levels, track material usage, and manage your warehouse with powerful inventory tools.
            </p>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <img src="https://placehold.co/800x400/e9f0ff/0a2168?text=Inventory+Dashboard" alt="Inventory Dashboard" className="w-full rounded-lg shadow-sm" />
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-card rounded-xl border border-primary/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent">
            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary">Compliance Management</h3>
            <p className="text-muted-foreground">
              Stay compliant with certifications, PPE requirements, and hazardous waste tracking tools.
            </p>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <img src="https://placehold.co/800x400/fff5e9/f97316?text=Compliance+Tools" alt="Compliance Tools" className="w-full rounded-lg shadow-sm" />
            </div>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-card rounded-xl border border-primary/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <PaintBucket className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary">Custom Creations</h3>
            <p className="text-muted-foreground">
              Create and manage custom paint colors, stains, and finishing recipes all in one place.
            </p>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <img src="https://placehold.co/800x400/e9f0ff/0a2168?text=Custom+Creations+Library" alt="Custom Creations Library" className="w-full rounded-lg shadow-sm" />
            </div>
          </div>
          
          {/* Feature 5 */}
          <div className="bg-card rounded-xl border border-primary/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent">
            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary">Quality Control</h3>
            <p className="text-muted-foreground">
              Track inspections, manage quality issues, and maintain high standards with built-in quality management tools.
            </p>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <img src="https://placehold.co/800x400/fff5e9/f97316?text=Quality+Control+Dashboard" alt="Quality Control Dashboard" className="w-full rounded-lg shadow-sm" />
            </div>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-card rounded-xl border border-primary/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary">Team Management</h3>
            <p className="text-muted-foreground">
              Manage your team, assign roles, and coordinate workflows efficiently across your entire department.
            </p>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <img src="https://placehold.co/800x400/e9f0ff/0a2168?text=Team+Dashboard" alt="Team Management Dashboard" className="w-full rounded-lg shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default FeaturesSection;