
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProductOverviewSection = () => {
  return (
    <section className="py-24 bg-gray-50">
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
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex justify-center mb-4">
              <h3 className="text-2xl font-bold text-blue-500">
                Fini<span className="text-blue-500">v</span>i
              </h3>
            </div>
            
            <div className="bg-blue-500 text-white py-3 px-6 rounded-full w-60 mx-auto text-center mb-8">
              <span className="font-medium">Strategy</span>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-6 flex flex-wrap md:flex-nowrap justify-between items-center">
              <div className="flex flex-col items-center p-4 w-1/3 md:w-auto">
                <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Feedback</span>
              </div>
              
              <div className="hidden md:block text-blue-300">→</div>
              
              <div className="flex flex-col items-center p-4 w-1/3 md:w-auto">
                <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Feature Definition</span>
              </div>
              
              <div className="hidden md:block text-blue-300">→</div>
              
              <div className="flex flex-col items-center p-4 w-1/3 md:w-auto">
                <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Prioritization</span>
              </div>
              
              <div className="hidden md:block text-blue-300">→</div>
              
              <div className="flex flex-col items-center p-4 w-1/3 md:w-auto">
                <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Capacity Planning</span>
              </div>
              
              <div className="hidden md:block text-blue-300">→</div>
              
              <div className="flex flex-col items-center p-4 w-1/3 md:w-auto">
                <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Roadmap</span>
              </div>
              
              <div className="hidden md:block text-blue-300">→</div>
              
              <div className="flex flex-col items-center p-4 w-1/3 md:w-auto">
                <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Execution</span>
              </div>
            </div>
            
            <div className="mt-6 bg-green-400 text-white py-3 px-6 rounded-full w-60 mx-auto text-center">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Guru™ by Finivi</span>
              </div>
            </div>
          </div>
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
    </section>
  );
};

export default ProductOverviewSection;
