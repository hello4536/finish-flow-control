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
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small finishing operations",
      badge: null,
      features: ["Up to 50 jobs per month", "Basic material tracking", "Standard reporting", "Email support"],
      extraFeatures: ["Mobile app access", "2 team members"],
      buttonText: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Ideal for growing finishing businesses",
      badge: "Most Popular",
      features: ["Unlimited jobs", "Advanced material tracking", "Custom workflows", "Priority support"],
      extraFeatures: ["Advanced reporting & analytics", "Up to 10 team members", "Compliance management", "Quality control tools"],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large-scale finishing operations",
      badge: null,
      features: ["Everything in Professional", "Unlimited team members", "Custom integrations", "24/7 phone support"],
      extraFeatures: ["Advanced security features", "Custom training sessions", "API access", "Dedicated account manager"],
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
            Start with a free trial. No setup fees, no hidden costs.
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
            Not sure which plan is right?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Start with our free trial and upgrade anytime.
          </p>
          <Button
            asChild
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold h-12"
          >
            <Link to="/auth/signup">Start Free Trial</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MobilePricingCards;