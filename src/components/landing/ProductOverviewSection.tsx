import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const ProductOverviewSection = () => {
  return <section className="bg-gradient-to-b from-gray-50 to-white py-[66px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Product Overview
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">The complete platform for</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              finishing operations
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From job management to compliance tracking, Finivo provides everything you need to run efficient, profitable finishing operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Streamlined Workflows</h3>
            <p className="text-gray-600">Optimize your finishing processes with automated workflows and real-time tracking.</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete Visibility</h3>
            <p className="text-gray-600">Get full visibility into your operations with comprehensive dashboards and reporting.</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Industry Compliance</h3>
            <p className="text-gray-600">Stay compliant with industry regulations through automated tracking and documentation.</p>
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group px-8 py-3 text-lg">
            <Link to="/features" className="flex items-center">
              Explore All Features
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>;
};
export default ProductOverviewSection;