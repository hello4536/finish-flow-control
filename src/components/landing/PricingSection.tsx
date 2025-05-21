
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-900 mb-4">
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            No hidden fees or surprise charges. Get started with our straightforward pricing plans.
          </p>
        </div>
        
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-8 shadow-sm relative hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-bold">Admin Access</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-bold">$49</span>
              <span className="text-gray-500 ml-2">/month</span>
            </div>
            <p className="mt-2 text-gray-600">
              Complete access for organizational administrators
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Full system access</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Subscription management</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Unlimited workflows</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Employee management</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Admin subscription includes first user</span>
              </li>
            </ul>
            <Button asChild className="mt-8 w-full rounded-md bg-blue-900 hover:bg-blue-800">
              <Link to="/auth/signup">Get Started</Link>
            </Button>
          </div>
          
          <div className="rounded-2xl border bg-white p-8 shadow-sm relative hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Employee Access</h3>
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">Per User</Badge>
            </div>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-bold">$10</span>
              <span className="text-gray-500 ml-2">/month per user</span>
            </div>
            <p className="mt-2 text-gray-600">
              Role-based access for your team members
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Role-based access</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Task management</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Workflow participation</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Material tracking</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Add as many employees as needed</span>
              </li>
            </ul>
            <Button asChild className="mt-8 w-full rounded-md bg-white hover:bg-gray-50 text-blue-900 border border-blue-900">
              <Link to="/auth/signup">Learn More</Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-600">
            All plans include email support. For enterprise needs, contact our sales team.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
