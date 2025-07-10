import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Gift, ArrowRight, Zap } from "lucide-react";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the page and hasn't been shown yet
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Add delay to avoid immediate triggering
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Exit intent email:', email);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-2 border-orange-200 shadow-2xl animate-scale-in">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white relative">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Wait! Don't Miss Out</h3>
              <p className="text-orange-100">
                Get our exclusive "Finishing Shop Efficiency Guide" worth $299 - FREE!
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                🎯 Reduce material waste by 40%
              </h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>✅ 25-page comprehensive guide</p>
                <p>✅ Industry-specific best practices</p>
                <p>✅ ROI calculation worksheets</p>
                <p>✅ Bonus: Compliance checklist</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
                size="lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                Get Free Guide + Start Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Join 5,000+ finishing professionals • No spam, unsubscribe anytime
              </p>
            </div>

            {/* Trust indicators */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-center items-center space-x-4 text-xs text-gray-600">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  Instant download
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                  14-day free trial
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
                  No credit card
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExitIntentPopup;