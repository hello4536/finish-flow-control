
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that suits your business needs.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
          <div className="rounded-lg border p-6 shadow-sm">
            <h3 className="text-xl font-bold">Admin Access</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-bold">$49</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="mt-2 text-muted-foreground">
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
            <Button className="mt-6 w-full">Get Started</Button>
          </div>
          <div className="rounded-lg border p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Employee Access</h3>
              <Badge>Per User</Badge>
            </div>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-bold">$10</span>
              <span className="text-muted-foreground">/month per user</span>
            </div>
            <p className="mt-2 text-muted-foreground">
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
            <Button className="mt-6 w-full" variant="outline">Learn More</Button>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-muted-foreground">
            All plans include email support. For enterprise needs, contact our sales team.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
