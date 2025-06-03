
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small finishing operations",
      badge: null,
      features: [
        "Up to 50 jobs per month",
        "Basic material tracking",
        "Standard reporting",
        "Email support",
        "Mobile app access",
        "2 team members"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Ideal for growing finishing businesses",
      badge: "Most Popular",
      features: [
        "Unlimited jobs",
        "Advanced material tracking",
        "Custom workflows",
        "Priority support",
        "Advanced reporting & analytics",
        "Up to 10 team members",
        "Compliance management",
        "Quality control tools"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large-scale finishing operations",
      badge: null,
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "Advanced security features",
        "Custom training sessions",
        "API access"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100/40 to-teal-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Pricing Plans
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Choose the perfect plan for</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              your finishing operations
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start with a free trial on any plan. No setup fees, no hidden costs. Scale as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular
                  ? 'border-blue-500 bg-white shadow-xl scale-105'
                  : 'border-gray-200 bg-white shadow-sm hover:border-blue-300'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-medium">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                asChild
                variant={plan.buttonVariant}
                size="lg"
                className={`w-full rounded-full font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                    : 'border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <Link to="/auth/signup" className="flex items-center justify-center">
                  {plan.buttonText}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Additional CTA Section */}
        <div className="mt-20 text-center bg-white rounded-2xl p-10 border border-gray-100 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Not sure which plan is right for you?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Start with our free trial and experience the full power of Finivo. 
              Upgrade or downgrade at any time with no penalties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link to="/auth/signup">Start Free Trial</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-full px-8 py-3 text-lg font-semibold transition-all duration-200"
              >
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
          
          {/* Decorative background for CTA */}
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-100/50 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-purple-100/50 -ml-12 -mb-12"></div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
