import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
const PricingSection = () => {
  const plans = [{
    name: "Professional Plan",
    price: "$75",
    period: "/month",
    description: "Complete finishing management solution",
    badge: "Most Popular",
    features: ["Admin dashboard access", "Unlimited jobs", "Advanced material tracking", "Equipment management", "Compliance tools", "Priority support", "Advanced reporting & analytics", "Email support"],
    buttonText: "Subscribe Now",
    buttonVariant: "default" as const,
    popular: true
  }, {
    name: "Additional Employee",
    price: "$25",
    period: "/month per user",
    description: "Add team members to your plan",
    badge: null,
    features: ["Employee dashboard access", "Job participation", "Material usage tracking", "Equipment assignments", "Task management", "Mobile app access"],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false
  }];
  return <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
            Professional-grade finishing management. $75/month base + $25 per additional team member.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => <div key={plan.name} className={`relative rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${plan.popular ? 'border-blue-500 bg-white shadow-xl scale-105' : 'border-gray-200 bg-white shadow-sm hover:border-blue-300'}`}>
              {plan.badge && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-medium">
                    {plan.badge}
                  </Badge>
                </div>}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>)}
              </ul>
              
              <Button asChild variant={plan.buttonVariant} size="lg" className={`w-full rounded-full font-semibold transition-all duration-200 ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' : 'border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}>
                <Link to="/auth/signup" className="flex items-center justify-center">
                  {plan.buttonText}
                </Link>
              </Button>
            </div>)}
        </div>

        {/* Additional CTA Section */}
        <div className="mt-20 text-center bg-white rounded-2xl p-10 border border-gray-100 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Ready to get started?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Join finishing professionals who use Finivo to streamline their operations.
              Start your subscription today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                <Link to="/auth/signup">Get Started</Link>
              </Button>
            </div>
          </div>
          
          {/* Decorative background for CTA */}
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-100/50 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-purple-100/50 -ml-12 -mb-12"></div>
        </div>
      </div>
    </section>;
};
export default PricingSection;