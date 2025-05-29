import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const ProductOverviewSection = () => {
  return <section className="py-24 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            End-to-end product management<br />
            platform with best practices built-in
          </h2>
          <p className="text-lg text-gray-600 max-w-[800px] mx-auto">
            From feedback collection to execution, Finivi helps your team manage
            the entire finishing process lifecycle in one place
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          {/* Platform diagram */}
          
        </div>
        
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-blue-50 p-8 rounded-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-blue-500 text-white rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-blue-500">Strategy</h3>
              </div>
              
              <h4 className="text-2xl font-bold mb-4 text-gray-900">Strategize your vision</h4>
              <p className="text-gray-600 mb-4">Zoom in and out to understand your long-term goals.</p>
              
              <Link to="/auth/signup" className="text-blue-500 hover:text-blue-700 inline-flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              
              <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="/lovable-uploads/74d7618a-542f-48b5-815a-31f6ee6a0599.png" alt="Strategy Dashboard" className="w-full" />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Manage personas</h3>
              <p className="text-gray-600 mb-6">
                Create persona cards to focus your team on why and for whom the product is being built.
              </p>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="/lovable-uploads/5e6c3750-c9db-4e38-95c6-5056f2ab7ecb.png" alt="Persona Management" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ProductOverviewSection;