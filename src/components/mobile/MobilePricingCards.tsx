import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

const MobilePricingCards = () => {
  const isMobile = useIsMobile();
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  if (!isMobile) return null;

  const plans = [
    {
      name: "Professional Plan",
      price: "$75",
      period: "/month",
      description: "Complete finishing management solution",
      badge: "Most Popular",
      features: ["Admin dashboard access", "Unlimited jobs", "Advanced material tracking", "Equipment management"],
      extraFeatures: ["Compliance tools", "Priority support", "Advanced reporting & analytics", "Email support"],
      buttonText: "Subscribe Now",
      popular: true
    },
    {
      name: "Additional Employee",
      price: "$25",
      period: "/month per user",
      description: "Add team members to your plan",
      badge: null,
      features: ["Employee dashboard access", "Job participation", "Material usage tracking", "Equipment assignments"],
      extraFeatures: ["Task management", "Mobile app access"],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  const togglePlan = (planName: string) => {
    setExpandedPlan(expandedPlan === planName ? null : planName);
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-gray-900">Choose the perfect plan</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              for your operations
            </span>
          </h2>
          <p className="text-sm text-gray-600">
            Professional-grade finishing management. $75 base + $25 per additional user.
          </p>
        </div>

        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border-2 p-6 transition-all duration-300 ${
                plan.popular
                  ? 'border-blue-500 bg-white shadow-xl'
                  : 'border-gray-200 bg-white shadow-sm'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 text-xs font-medium">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1 text-sm">{plan.period}</span>
                </div>

                <Button
                  asChild
                  size="lg"
                  className={`w-full rounded-full font-semibold h-12 mb-4 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                      : 'border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 bg-white text-gray-900'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link to="/auth/signup" className="flex items-center justify-center">
                    {plan.buttonText}
                  </Link>
                </Button>
              </div>

              {/* Core features - always visible */}
              <div className="space-y-2 mb-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Expandable additional features */}
              {plan.extraFeatures.length > 0 && (
                <>
                  <button
                    onClick={() => togglePlan(plan.name)}
                    className="flex items-center justify-center w-full text-sm text-blue-600 font-medium py-2 hover:text-blue-700 transition-colors"
                  >
                    {expandedPlan === plan.name ? (
                      <>
                        Show less <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show all features <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </button>

                  {expandedPlan === plan.name && (
                    <div className="space-y-2 pt-4 border-t border-gray-100 animate-fade-in">
                      {plan.extraFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
          <h3 className="text-lg font-bold mb-2 text-gray-900">
            Ready to get started?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Join finishing professionals using Finivo today.
          </p>
          <Button
            asChild
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold h-12"
          >
            <Link to="/auth/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MobilePricingCards;