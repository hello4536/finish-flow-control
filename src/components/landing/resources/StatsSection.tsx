
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentItem } from "./types";

interface StatsSectionProps {
  allContent: ContentItem[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ allContent }) => {
  return (
    <div className="text-center bg-white rounded-2xl p-12 border border-gray-100 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {allContent.filter(item => item.type === "article").length}+
          </div>
          <div className="text-gray-600 font-medium">Expert Articles</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-red-600 mb-2">
            {allContent.filter(item => item.type === "video").length}+
          </div>
          <div className="text-gray-600 font-medium">Video Tutorials</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
          <div className="text-gray-600 font-medium">Industry Specialties</div>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-4">
        Ready to access our complete knowledge base?
      </h3>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Sign up for Finivo to unlock advanced tutorials, industry insights, and connect with our community of finishing professionals.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          asChild 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group"
        >
          <Link to="/auth/signup" className="flex items-center">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        
        <Button 
          asChild 
          variant="outline" 
          size="lg"
          className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-200"
        >
          <Link to="/woodworking-finishing">Explore Woodworking</Link>
        </Button>
        
        <Button 
          asChild 
          variant="outline" 
          size="lg"
          className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-200"
        >
          <Link to="/auto-body-finishing">Explore Auto Body</Link>
        </Button>
      </div>
    </div>
  );
};

export default StatsSection;
