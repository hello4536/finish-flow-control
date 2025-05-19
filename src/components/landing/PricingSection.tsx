
import React from "react";
import PlanCard from "@/components/subscription/PlanCard";

const PricingSection = () => {
  return (
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
  );
};

export default PricingSection;
