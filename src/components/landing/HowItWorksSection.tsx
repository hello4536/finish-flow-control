
import React from "react";
import { ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Getting started is simple
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-[700px] mx-auto">
            Three easy steps to transform your finishing operations
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="relative">
            <div className="rounded-xl p-8 h-full border bg-white shadow-sm">
              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-4 mt-2 text-gray-900">Sign Up</h3>
              <p className="text-gray-600 mb-4">
                Create your account with a simple registration process. Choose your plan and set up your organization profile.
              </p>
              <div className="mt-4 text-sm text-gray-700">
                <p><strong>Admin:</strong> $49/month (includes 1 admin user)</p>
                <p><strong>+ Employees:</strong> $10/month each</p>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative">
            <div className="rounded-xl p-8 h-full border bg-white shadow-sm">
              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-4 mt-2 text-gray-900">Set Up Your Team</h3>
              <p className="text-gray-600 mb-4">
                Invite team members, assign roles, and customize permissions to match your organizational structure.
              </p>
              <div className="mt-4">
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    Admins have full system access
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    Employees have role-based access
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    Add team members as needed
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative">
            <div className="rounded-xl p-8 h-full border bg-white shadow-sm">
              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-4 mt-2 text-gray-900">Manage Operations</h3>
              <p className="text-gray-600 mb-4">
                Start using Finivi to track materials, manage workflows, ensure compliance, and streamline your finishing operations.
              </p>
              <div className="mt-4 text-sm text-gray-700">
                <p>Access all features immediately after subscription activation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
