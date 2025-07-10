import React from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const StickyMobileCTA = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
      <div className="flex gap-3">
        <Button
          asChild
          size="lg"
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold text-base h-12 shadow-lg"
        >
          <Link to="/auth/signup" className="flex items-center justify-center">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-12 w-12 rounded-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 shadow-lg flex-shrink-0"
        >
          <Phone className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;