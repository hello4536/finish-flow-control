
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PlanCard from "@/components/subscription/PlanCard";
import { 
  CheckCircle2, 
  Shield, 
  PackageOpen, 
  BarChart, 
  Users, 
  PaintBucket,
  ArrowRight, 
  Calendar,
  Sparkles
} from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">F</span>
            </div>
            <div className="text-xl font-bold">Finivi</div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
              Benefits
            </Link>
            <Link to="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/auth/signin" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
              Sign In
            </Link>
            <Button asChild size="sm" className="h-9">
              <Link to="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-80 rounded-3xl blur-3xl"></div>
            </div>
            <div className="flex flex-col items-center gap-6 text-center max-w-[800px] mx-auto">
              <Badge className="rounded-full px-4 py-1 text-sm bg-primary/10 text-primary border-none">
                Streamline Your Finishing Operations
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Manage Your Finishing Department <span className="text-primary">Effortlessly</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                Comprehensive tools for workflows, materials, inventory, compliance, and more — all in one platform designed for finishing professionals.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                <Button asChild size="lg" className="h-12 px-6 rounded-full">
                  <Link to="/auth/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-6 rounded-full">
                  <Link to="#features">
                    See Features
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Dashboard Preview */}
            <div className="mt-16 relative">
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 to-accent/5 rounded-xl"></div>
              <div className="bg-background border rounded-xl shadow-xl overflow-hidden">
                <div className="h-8 bg-muted flex items-center px-4 border-b">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="p-4">
                  <img 
                    src="https://placehold.co/1200x600/f5f7ff/a4aedb?text=Finivi+Dashboard+Preview" 
                    alt="Finivi Dashboard" 
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Comprehensive Features for Finishing Operations
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
                Everything you need to manage your finishing department efficiently in one powerful platform.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-card rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Job & Task Management</h3>
                <p className="text-muted-foreground">
                  Schedule, assign and track all finishing tasks with ease. Keep workflows organized and meet deadlines consistently.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-card rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <PackageOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Inventory Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor stock levels, track material usage, and manage your warehouse with powerful inventory tools.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-card rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Compliance Management</h3>
                <p className="text-muted-foreground">
                  Stay compliant with certifications, PPE requirements, and hazardous waste tracking tools.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-card rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <PaintBucket className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Custom Creations</h3>
                <p className="text-muted-foreground">
                  Create and manage custom paint colors, stains, and finishing recipes all in one place.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div className="bg-card rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Control</h3>
                <p className="text-muted-foreground">
                  Track inspections, manage quality issues, and maintain high standards with built-in quality management tools.
                </p>
              </div>
              
              {/* Feature 6 */}
              <div className="bg-card rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Management</h3>
                <p className="text-muted-foreground">
                  Manage your team, assign roles, and coordinate workflows efficiently across your entire department.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section id="benefits" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Transforming Finishing Operations
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
                See how Finivi brings efficiency, organization, and control to finishing departments.
              </p>
            </div>
            
            <div className="grid gap-y-16 lg:gap-x-8 lg:grid-cols-2">
              {/* Left column */}
              <div className="space-y-8">
                {/* Benefit 1 */}
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Increased Efficiency</h3>
                    <p className="text-muted-foreground">
                      Streamlined workflows and automation help your team work smarter, reducing time spent on administrative tasks by up to 40%.
                    </p>
                  </div>
                </div>
                
                {/* Benefit 2 */}
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Better Compliance</h3>
                    <p className="text-muted-foreground">
                      Stay on top of regulatory requirements with built-in compliance tools that help avoid costly penalties and ensure workplace safety.
                    </p>
                  </div>
                </div>
                
                {/* Benefit 3 */}
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Reduced Waste</h3>
                    <p className="text-muted-foreground">
                      Track material usage precisely to minimize waste and optimize inventory levels, cutting material costs significantly.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right column */}
              <div className="space-y-8">
                {/* Benefit 4 */}
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Team Coordination</h3>
                    <p className="text-muted-foreground">
                      Enhance communication and collaboration between team members with task assignments and progress tracking.
                    </p>
                  </div>
                </div>
                
                {/* Benefit 5 */}
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Time-Saving Workflows</h3>
                    <p className="text-muted-foreground">
                      Predefined workflows and templates save time on repetitive tasks and ensure consistency across projects.
                    </p>
                  </div>
                </div>
                
                {/* Benefit 6 */}
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Data-Driven Decisions</h3>
                    <p className="text-muted-foreground">
                      Comprehensive reporting and analytics help you identify bottlenecks, optimize processes, and make informed business decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Getting Started Is Easy
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
                Three simple steps to transform your finishing department operations.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-card rounded-xl border p-6 shadow-sm h-full">
                  <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-2">Sign Up</h3>
                  <p className="text-muted-foreground">
                    Create your account with a simple registration process. Choose your plan and set up your organization profile.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="bg-card rounded-xl border p-6 shadow-sm h-full">
                  <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-2">Set Up Your Team</h3>
                  <p className="text-muted-foreground">
                    Invite team members, assign roles, and customize permissions to match your organizational structure.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="bg-card rounded-xl border p-6 shadow-sm h-full">
                  <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-2">Manage Operations</h3>
                  <p className="text-muted-foreground">
                    Start using Finivi to track materials, manage workflows, ensure compliance, and streamline your finishing operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
                Choose the plan that's right for your finishing department.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Admin Plan */}
              <PlanCard
                title="Admin Account"
                price={49}
                description="Full access for the first user in your organization"
                features={[
                  { text: "Complete access to all features", included: true },
                  { text: "Add additional users at $10/month each", included: true },
                  { text: "Unlimited workflows", included: true },
                  { text: "Material tracking", included: true },
                  { text: "Custom creations library", included: true },
                  { text: "Compliance management", included: true },
                  { text: "Priority support", included: true },
                ]}
                onSubscribe={() => window.location.href = '/auth/signup'}
              />
              
              {/* Employee Plan */}
              <PlanCard
                title="Employee Account"
                price={10}
                description="Per additional user in your organization"
                features={[
                  { text: "Access to assigned workflows", included: true },
                  { text: "Task management", included: true },
                  { text: "Material usage tracking", included: true },
                  { text: "View reports and dashboards", included: true },
                  { text: "Access to shared recipes and creations", included: true },
                  { text: "Mobile app access", included: true },
                  { text: "Standard support", included: true },
                ]}
                onSubscribe={() => window.location.href = '/auth/signup'}
              />
            </div>
            
            {/* FAQ */}
            <div className="mt-16 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-card rounded-lg border p-5">
                  <h4 className="font-bold mb-2">Is there a free trial?</h4>
                  <p className="text-muted-foreground">Yes, Finivi offers a 14-day free trial with full access to all features so you can fully evaluate the platform before purchasing.</p>
                </div>
                <div className="bg-card rounded-lg border p-5">
                  <h4 className="font-bold mb-2">Can I cancel my subscription anytime?</h4>
                  <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing cycle.</p>
                </div>
                <div className="bg-card rounded-lg border p-5">
                  <h4 className="font-bold mb-2">Is my data secure?</h4>
                  <p className="text-muted-foreground">Finivi uses industry-standard security measures to protect your data. All information is encrypted and stored securely.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-20 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-6 text-center max-w-[800px] mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary-foreground">
                Ready to Transform Your Finishing Department?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-[600px]">
                Join thousands of finishing professionals who use Finivi to streamline operations, reduce waste, and improve efficiency.
              </p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-8 rounded-full">
                <Link to="/auth/signup">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-sm text-primary-foreground/60">
                No credit card required. 14-day free trial.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-muted/40 border-t py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">F</span>
                </div>
                <div className="text-xl font-bold">Finivi</div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive finishing department management platform for modern businesses.
              </p>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Finivi. All rights reserved.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 lg:col-span-2">
              <div>
                <h3 className="font-semibold mb-3">Product</h3>
                <ul className="space-y-2">
                  <li><Link to="#features" className="text-sm text-muted-foreground hover:text-primary">Features</Link></li>
                  <li><Link to="#pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
                  <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Testimonials</Link></li>
                  <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">About</Link></li>
                  <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
                  <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                  <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
