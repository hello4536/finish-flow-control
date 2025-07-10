import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, X, ArrowRight, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const CompetitiveAdvantage = () => {
  const comparisons = [
    {
      feature: "Industry-Specific Features",
      finivo: "Built for finishing shops",
      generic: "Generic project management",
      finivoHas: true,
      genericHas: false
    },
    {
      feature: "Paint Formula Tracking",
      finivo: "Complete formula library with versions",
      generic: "Not available",
      finivoHas: true,
      genericHas: false
    },
    {
      feature: "Spray Booth Management",
      finivo: "Real-time booth scheduling & monitoring",
      generic: "Basic calendar only",
      finivoHas: true,
      genericHas: false
    },
    {
      feature: "Automated Compliance",
      finivo: "EPA, OSHA, VOC auto-reporting",
      generic: "Manual tracking only",
      finivoHas: true,
      genericHas: false
    },
    {
      feature: "Material Waste Tracking",
      finivo: "Real-time usage with waste alerts",
      generic: "Basic inventory",
      finivoHas: true,
      genericHas: true
    },
    {
      feature: "Mobile Shop Floor App",
      finivo: "Optimized for finishing operations",
      generic: "Basic mobile view",
      finivoHas: true,
      genericHas: true
    },
    {
      feature: "Industry Integrations",
      finivo: "Paint suppliers, equipment vendors",
      generic: "Generic integrations",
      finivoHas: true,
      genericHas: false
    }
  ];

  const industryBenefits = [
    {
      title: "Automotive Shops",
      benefits: ["Paint matching database", "Insurance claim integration", "Customer photo tracking"],
      icon: "🚗"
    },
    {
      title: "Woodworking",
      benefits: ["Wood species tracking", "Stain formula library", "Finish quality controls"],
      icon: "🪵"
    },
    {
      title: "Manufacturing",
      benefits: ["Batch coating tracking", "QC checkpoint automation", "Production line integration"],
      icon: "🏭"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200/50 text-orange-700 text-sm font-medium mb-6">
            <Trophy className="w-4 h-4 mr-2" />
            Why Choose Finivo
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Finivo vs Generic</span>
            <br />
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Project Management Tools
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stop forcing generic tools to work for finishing operations. Finivo was built from the ground up 
            for automotive, woodworking, and manufacturing finishing departments.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <Card className="border-2 border-gray-200 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                {/* Header */}
                <div className="p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Feature Comparison</h3>
                </div>
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-blue-900">Finivo</h3>
                    <p className="text-sm text-blue-700">Built for Finishing</p>
                  </div>
                </div>
                <div className="p-6 bg-gray-50">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">?</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700">Generic Tools</h3>
                    <p className="text-sm text-gray-600">One-size-fits-all</p>
                  </div>
                </div>
              </div>

              {/* Comparison Rows */}
              {comparisons.map((comparison, index) => (
                <div key={index} className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900">{comparison.feature}</h4>
                  </div>
                  <div className="p-4 bg-blue-50/30">
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-900">{comparison.finivo}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start space-x-2">
                      {comparison.genericHas ? (
                        <CheckCircle2 className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span className="text-sm text-gray-700">{comparison.generic}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Industry-Specific Benefits */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="text-gray-900">Industry-Specific Features</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Built for Your Business
            </span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {industryBenefits.map((industry, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">{industry.title}</h4>
                  <ul className="space-y-2">
                    {industry.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to switch from generic tools?
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join 1000+ finishing shops who've made the switch to industry-specific software
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold">
              <Link to="/auth/signup" className="flex items-center">
                Start Free Migration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-4 text-lg font-semibold">
              <Link to="/features">Compare Features</Link>
            </Button>
          </div>
          
          <div className="mt-6 text-sm opacity-80">
            <span className="font-medium">Free migration assistance included</span> • No setup fees • Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveAdvantage;